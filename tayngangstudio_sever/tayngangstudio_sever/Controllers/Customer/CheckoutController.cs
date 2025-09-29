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

        //[HttpPost("payos/webhook")]
        //[ApiExplorerSettings(IgnoreApi = true)]
        //public async Task<IActionResult> PayOSWebhook([FromBody] WebhookData? payload)
        //{
        //    _logger.LogInformation("Webhook nhận payload: {@payload}", payload);

        //    if (payload == null)
        //    {
        //        return Ok("Null rồi huhu");
        //    }


        //    if (payload.code == "00")
        //    {
        //        await _checkoutService.UpdateOrderStatus(payload.orderCode);
        //    }

        //    return Ok();
        //}

        [HttpPost("payos/webhook")]
        [AllowAnonymous]
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IActionResult> PayOSWebhook([FromBody] WebhookType payload)
        {
            // 1) Log thô để debug (đừng log secret ký)
            _logger.LogInformation("[PayOS][Webhook] Received payload: {@payload}", payload);


            if (payload == null)
            {
                // Trả 2xx để PayOS không retry vô hạn, nhưng ghi log để kiểm tra
                _logger.LogWarning("[PayOS][Webhook] Payload is null");
                return Ok(new { code = -1, message = "empty payload" });
            }


            try
            {
                // 2) Xác minh chữ ký & parse dữ liệu an toàn
                WebhookData data = _payOS.verifyPaymentWebhookData(payload);
                _logger.LogInformation("[PayOS][Webhook] Verified: {@data}", data);
                _logger.LogInformation("[PayOS][Webhook] Verified: {@data}", data.orderCode);



                // 3) Idempotency: xử lý theo orderCode/paymentLinkId một lần duy nhất
                // Bạn tự định nghĩa HandleWebhookAsync để cập nhật trạng thái đơn, lưu log, v.v.
                // Nên dựa vào data.orderCode (hoặc data.paymentLinkId) + trạng thái hiện tại trong DB.
                await _checkoutService.UpdateOrderStatus(data.orderCode, data.code);


                // 4) Trả 2xx càng sớm càng tốt
                return Ok(new { code = "00", message = "acknowledged" });
            }
            catch (System.Exception ex)
            {
                // KHÔNG trả 500 để tránh PayOS retry spam khi lỗi tạm thời phía bạn.
                _logger.LogError(ex, "[PayOS][Webhook] Error verifying/handling payload");
                return Ok(new { code = -1, message = "handled with error" });
            }
        }
    }
}