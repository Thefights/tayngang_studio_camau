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
    public class CheckoutController(ICheckoutService _checkoutService, ILogger<CheckoutController> _logger, PayOS _payOS) : ControllerBase
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
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> PayOSWebhook([FromBody] WebhookType payload)
        {
            if (payload == null)
            {
                return Ok(new { code = -1, message = "empty payload" });
            }

            try
            {
                WebhookData data = _payOS.verifyPaymentWebhookData(payload);

                await _checkoutService.UpdateOrderStatus(data.orderCode, data.code);
                return Ok(new { code = "00", message = "acknowledged" });
            }
            catch (Exception ex)
            {
                return Ok(new { code = -1, message = ex.Message });
            }
        }

        [HttpPost("cancel")]
        public async Task<IActionResult> CancelOrder()
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            await _checkoutService.CancelOrderByUserId(userId);
            return NoContent();
        }
    }
}