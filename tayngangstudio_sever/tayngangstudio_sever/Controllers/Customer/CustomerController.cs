using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services.ManagementService;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Customer")]
    public class CustomerController(ICustomerService customerService) : ControllerBase
    {
        private readonly ICustomerService _customerService = customerService;

        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim not found.");
            }
            var userId = int.Parse(userIdClaim.Value);
            var user = await _customerService.GetUserProfileAsync(userId);
            return Ok(user);
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UserUpdateDTO userUpdateDTO)
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim not found.");
            }
            var userId = int.Parse(userIdClaim.Value);
            await _customerService.UpdateUserProfileAsync(userId, userUpdateDTO);
            return Ok("Profile updated successfully.");
        }

        [HttpGet("orders")]
        public async Task<IActionResult> GetUserOrders()
        {
            var userIdClaim = User.FindFirst("id");
            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim not found.");
            }
            var userId = int.Parse(userIdClaim.Value);
            var orders = await _customerService.GetUserOrdersAsync(userId);
            return Ok(orders);
        }
    }
}