using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO.UserDTO;
using BusinessLogicLayer.Implements.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var user = await _customerService.GetUserProfileAsync(userId);
            return Ok(user);
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UserUpdateDTO userUpdateDTO)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            await _customerService.UpdateUserProfileAsync(userId, userUpdateDTO);
            return Ok("Profile updated successfully.");
        }

        [HttpGet("orders")]
        public async Task<IActionResult> GetUserOrders()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var orders = await _customerService.GetUserOrdersAsync(userId);
            return Ok(orders);
        }
    }
}
