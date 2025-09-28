using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;
using Net.payOS;
using Net.payOS.Types;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IOrderService : ICrudService<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order>
    {
        Task<string> CreatePaymentLink(int orderId);
        Task<string> VerifyPayment(int orderId);
        Task<GetOrderDTO> GetOrderByCurrentUser(int userId);
    }

    public class OrderService(IUnitOfWork _unitOfWork, IMapper _mapper, PayOS _payOS) : CrudService<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order>(_unitOfWork, _mapper, ["OrderDetails"]), IOrderService
    {
        public async Task<string> CreatePaymentLink(int orderId)
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

        public async Task<string> VerifyPayment(int orderId)
        {
            PaymentLinkInformation paymentLinkInformation = await _payOS.getPaymentLinkInformation(orderId);

            if (paymentLinkInformation.status == "PAID")
            {
                var order = await _unitOfWork.Repository<Order>().GetByIdAsync(orderId);
                order.Status = DataAccessLayer.Enums.OrderStatusEnum.Completed;
                _unitOfWork.Repository<Order>().Update(order);
                await _unitOfWork.SaveChangesAsync();
            }

            return paymentLinkInformation.status;
        }

        public async Task<GetOrderDTO> GetOrderByCurrentUser(int userId)
        {
            var order = await _unitOfWork.Repository<Order>().GetByCondition(u => u.UserId == userId, ["OrderDetails"]);
            return _mapper.Map<GetOrderDTO>(order);
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