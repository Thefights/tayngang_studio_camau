using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services;
using DataAccessLayer.Enums;
using Microsoft.AspNetCore.Mvc;
using Net.payOS.Types;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController(ICheckoutService _checkoutService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Checkout([FromBody] CheckoutRequestDTO dto)
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var paymentLink = await _checkoutService.Checkout(userId, (PaymentMethodEnum)dto.PaymentMethod);
            return Ok(new { PaymentLink = paymentLink });
        }

        //[HttpPost("VerifyPayment/{orderId}")]
        //public async Task<IActionResult> VerifyPayment(int orderId)
        //{
        //    var result = await _checkoutService.VerifyPayment(orderId);
        //    return Ok(new { status = result });
        //}

        [HttpPost("payos/webhook")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult PayOSWebhook(WebhookData? payload)
        {
            if (payload.code == "00")
            {
                _checkoutService.UpdateOrderStatus(payload.orderCode);
            }

            return Ok("Hehe");
        }
    }
}