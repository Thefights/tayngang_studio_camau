using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Helpers;
using DataAccessLayer.Enums;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;
using Net.payOS;
using Net.payOS.Types;

namespace BusinessLogicLayer.Implements.Services
{
    public interface ICheckoutService
    {
        Task<string> Checkout(int userId, PaymentMethodEnum paymentMethod);
        Task UpdateOrderStatus(long orderId);
    }

    public class CheckoutService(IUnitOfWork _unitOfWork, IOrderService _orderService, PayOS _payOS, IMapper _mapper) : ICheckoutService
    {
        public async Task<string> Checkout(int userId, PaymentMethodEnum paymentMethod)
        {
            var cartRepo = _unitOfWork.Repository<Cart>();
            var cart = await cartRepo.GetByCondition(c => c.UserId == userId, ["CartItems.Product"]);
            if (cart == null || !cart.CartItems.Any())
            {
                throw new NotFoundException("Cart is empty or does not exist.");
            }

            var orderDto = new CreateOrderDTO
            {
                UserId = userId,
                PaymentMethod = paymentMethod,
                OrderDetails = cart.CartItems.Select(ci => new CreateOrderDetailDTO
                {
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity,
                    UnitPrice = ci.UnitPrice
                }).ToList(),
            };


            var order = await _orderService.CreateOrderAsync(orderDto);
            cart.CartItems.Clear();
            await _unitOfWork.SaveChangesAsync();

            if (paymentMethod == PaymentMethodEnum.PayOS)
            {
                var paymentLink = await CreatePaymentLink(order.Id);
                return paymentLink;
            }

            return string.Empty;
        }

        private async Task<string> CreatePaymentLink(int orderId)
        {
            try
            {
                var order = await GetOrderById(orderId);
                string description = "Order Payment";

                List<ItemData> items = new List<ItemData>();

                foreach (var detail in order.OrderDetails)
                {
                    var product = await GetProductById(detail.ProductId);
                    ItemData item = new ItemData(
                         product.Name,
                         detail.Quantity,
                         (int)detail.UnitPrice
         );
                    items.Add(item);
                }
                var totalAmount = items.Sum(i => i.quantity * i.price);
                var cancelUrl = "https://fptsoftware.com/";
                var returnUrl = "http://localhost:3000/checkout/success/";

                PaymentData paymentData = new PaymentData(orderId, totalAmount, description, items, cancelUrl, returnUrl);

                CreatePaymentResult createPayment = await _payOS.createPaymentLink(paymentData);

                return createPayment.checkoutUrl;
            }
            catch (Exception ex)
            {

                throw new Exception("", ex);
            }
        }

        public async Task ConfirmWebhook(string webhookUrl)
        {
            await _payOS.confirmWebhook(webhookUrl);
        }

        public async Task UpdateOrderStatus(long orderId)
        {
            var order = await _unitOfWork.Repository<Order>().GetByIdAsync((int)orderId);

            order.Status = OrderStatusEnum.Completed;

            _unitOfWork.Repository<Order>().Update(order);
            await _unitOfWork.SaveChangesAsync();
        }

        private async Task<GetProductDTO> GetProductById(int productId)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(productId);
            return _mapper.Map<GetProductDTO>(product);
        }

        private async Task<GetOrderDTO> GetOrderById(int orderId)
        {
            var order = await _unitOfWork.Repository<Order>().GetByIdAsync(orderId, ["OrderDetails"]);
            return _mapper.Map<GetOrderDTO>(order);
        }
    }
}