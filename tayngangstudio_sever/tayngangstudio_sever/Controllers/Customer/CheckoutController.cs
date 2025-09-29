using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services;
using DataAccessLayer.Enums;
using Microsoft.AspNetCore.Mvc;
using Net.payOS;
using Net.payOS.Types;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController(ICheckoutService _checkoutService, PayOS _payOS) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Checkout([FromBody] CheckoutRequestDTO dto)
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var paymentLink = await _checkoutService.Checkout(userId, (PaymentMethodEnum)dto.PaymentMethod);
            return Ok(new { PaymentLink = paymentLink });
        }

        [HttpPost("payos/webhook")]
        [AllowAnonymous]
        [Consumes("application/json")]
        public async Task<IActionResult> PayOSWebhook([FromBody] WebhookType body)
        {
            // 1) Xác minh chữ ký + bóc dữ liệu theo đúng SDK
            WebhookData data = _payOS.verifyPaymentWebhookData(body); // trả về WebhookData đã verify

            // 2) Xử lý nghiệp vụ
            if (data.code == "00")
            {
                await _checkoutService.UpdateOrderStatus(data.orderCode);
            }

            // 3) Trả 200 cho PayOS
            return Ok();
        }
    }
}