using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Helpers;
using BusinessLogicLayer.Implements.Base;
using BusinessLogicLayer.StateMachines;
using DataAccessLayer.Enums;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;
using Net.payOS;
using Net.payOS.Types;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IOrderManagementService : ICrudService<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order>
    {
        Task UpdateStatusAsync(int id, OrderStatusEnum status);
    }

    public class OrderManagementService(IUnitOfWork _unitOfWork, IMapper _mapper, PayOS _payOS) : CrudService<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order>(_unitOfWork, _mapper, ["OrderDetails.Product"]), IOrderManagementService
    {
        public override async Task<GetOrderDTO> CreateAsync(CreateOrderDTO dto)
        {
            foreach (var detail in dto.OrderDetails)
            {
                var product = await _unitOfWork.Repository<Product>().GetByIdAsync(detail.ProductId);
                if (product == null)
                {
                    throw new NotFoundException($"Product with ID {detail.ProductId} not found");
                }

                if (product.Quantity < detail.Quantity)
                {
                    throw new InvalidOperationException($"Product '{product.Name}' is out of stock. Available: {product.Quantity}, Requested: {detail.Quantity}");
                }
            }

            var createdOrder = await base.CreateAsync(dto);
            string? paymentUrl = null;

            if (dto.PaymentMethod == PaymentMethodEnum.PayOS)
            {
                string description = "Order Payment";
                List<ItemData> items = new List<ItemData>();

                foreach (var detail in dto.OrderDetails)
                {
                    var product = await _unitOfWork.Repository<Product>().GetByIdAsync(detail.ProductId);
                    if (product != null)
                    {
                        ItemData item = new ItemData(
                            product.Name,
                            detail.Quantity,
                            (int)product.Price
                        );
                        items.Add(item);
                    }
                }

                var totalAmount = items.Sum(i => i.quantity * i.price);
                var cancelUrl = "https://fptsoftware.com/";
                var returnUrl = "https://fptsoftware.com/";

                var paymentId = long.Parse(DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString());

                PaymentData paymentData = new PaymentData(paymentId, totalAmount, description, items, cancelUrl, returnUrl);

                CreatePaymentResult createPayment = await _payOS.createPaymentLink(paymentData);


                paymentUrl = createPayment.checkoutUrl;
            }

            createdOrder.PaymentUrl = paymentUrl;

            return createdOrder;
        }

        public async Task UpdateStatusAsync(int id, OrderStatusEnum status)
        {
            var order = await _unitOfWork.Repository<Order>().GetByIdAsync(id, ["OrderDetails"]) ?? throw new NotFoundException("Order not found");

            var stateMachine = new OrderStateMachine(order.Status);

            var trigger = status switch
            {
                OrderStatusEnum.Canceled => OrderStateMachine.Trigger.Cancel,
                OrderStatusEnum.Completed => OrderStateMachine.Trigger.Complete,
                _ => throw new ValidationException("Invalid status transition")
            };

            stateMachine.Fire(trigger);

            if (stateMachine.State == OrderStatusEnum.Completed && order.Status != OrderStatusEnum.Completed)
            {
                foreach (var orderDetail in order.OrderDetails)
                {
                    var product = await _unitOfWork.Repository<Product>().GetByIdAsync(orderDetail.ProductId);
                    if (product != null)
                    {
                        if (product.Quantity < orderDetail.Quantity)
                        {
                            throw new InvalidOperationException($"Insufficient stock for product '{product.Name}'. Available: {product.Quantity}, Required: {orderDetail.Quantity}");
                        }

                        product.Quantity -= orderDetail.Quantity;
                        _unitOfWork.Repository<Product>().Update(product);
                    }
                }
            }

            order.Status = stateMachine.State;

            _unitOfWork.Repository<Order>().Update(order);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}