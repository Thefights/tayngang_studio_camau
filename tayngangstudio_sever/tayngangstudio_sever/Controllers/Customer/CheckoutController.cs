using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services;
using DataAccessLayer.Enums;
using Microsoft.AspNetCore.Mvc;
using Net.payOS;
using Net.payOS.Types;
using NetCoreDemo.Types;

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
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> PayOSWebhook([FromBody] WebhookData? payload)
        {
            _logger.LogInformation("Webhook nhận payload: {@payload}", payload);

            if (payload == null)
            {
                return Ok("Null rồi huhu");
            }


            if (payload.code == "00")
            {
                await _checkoutService.UpdateOrderStatus(payload.orderCode);
            }

            return Ok();
        }

        [HttpPost("confirm-webhook")]
        public async Task<IActionResult> ConfirmWebhook(ConfirmWebhook body)
        {
            await _payOS.confirmWebhook(body.webhook_url);
            return Ok();
        }
    }
}