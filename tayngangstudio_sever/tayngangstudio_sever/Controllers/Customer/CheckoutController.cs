using BusinessLogicLayer.Implements.Services;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController(ICheckoutService _checkoutService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Checkout([FromQuery] int paymentMethod)
        {
            var userIdFromToken = int.Parse(User.FindFirst("id")!.Value);
            var paymentMethodEnum = (DataAccessLayer.Enums.PaymentMethodEnum)paymentMethod;
            var paymentLink = await _checkoutService.Checkout(userIdFromToken, paymentMethodEnum);
            return Ok(new { PaymentLink = paymentLink });
        }
    }
}
