using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services;
using DataAccessLayer.Enums;
using Microsoft.AspNetCore.Mvc;
using Net.payOS.Types;
using System.Text.Json;

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

        [HttpPost("payos/webhook")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> PayOSWebhook([FromBody] JsonElement payload)
        {
            if (payload.ValueKind == JsonValueKind.Undefined || payload.ValueKind == JsonValueKind.Null)
            {
                return Ok(); // verify request
            }

            // map về WebhookData khi có giao dịch thật
            var data = JsonSerializer.Deserialize<WebhookData>(payload);

            if (data != null && data.code == "00")
            {
                await _checkoutService.UpdateOrderStatus(data.orderCode);
            }

            return Ok();
        }
    }
}