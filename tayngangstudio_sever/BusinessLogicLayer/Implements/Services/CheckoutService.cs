using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Helpers;
using DataAccessLayer.Enums;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface ICheckoutService
    {
        Task<string> Checkout(int userId, PaymentMethodEnum paymentMethod);
    }

    public class CheckoutService(IUnitOfWork _unitOfWork, IOrderService _orderService) : ICheckoutService
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

            var order = await _orderService.CreateAsync(orderDto);
            cart.CartItems.Clear();
            await _unitOfWork.SaveChangesAsync();

            if (paymentMethod == PaymentMethodEnum.PayOS)
            {
                var paymentLink = await _orderService.CreatePaymentLink(order.Id);
                return paymentLink;
            }

            return string.Empty;
        }
    }
}