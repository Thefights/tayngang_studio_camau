using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using tayngangstudio_sever.Controllers.Base;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController(IOrderService _orderService) : CrudController<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order>(_orderService)
    {
        [HttpPost("CreatePaymentLink/{orderId}")]
        public async Task<IActionResult> CreatePaymentLink(int orderId)
        {
            var paymentLink = await _orderService.CreatePaymentLink(orderId);
            return Ok(paymentLink);
        }

        [HttpPost("VerifyPayment/{orderId}")]
        public async Task<IActionResult> VerifyPayment(int orderId)
        {
            var result = await _orderService.VerifyPayment(orderId);
            return Ok(new { status = result });
        }

        [HttpGet("getUserOrder")]
        public async Task<IActionResult> GetUserOrder()
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var data = await _orderService.GetOrderByCurrentUser(userId);
            return Ok(data);
        }
    }
}