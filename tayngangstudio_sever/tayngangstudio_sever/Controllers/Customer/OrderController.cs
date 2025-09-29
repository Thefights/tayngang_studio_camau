using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.Implements.Services;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController(IOrderService _orderService) : ControllerBase
    {
        [HttpGet("getUserOrder")]
        public async Task<IActionResult> GetUserOrder()
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var data = await _orderService.GetOrdersByCurrentUser(userId);
            return Ok(data);
        }
    }
}