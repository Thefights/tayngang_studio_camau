using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController(IUserService _userService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetUserById()
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var data = await _userService.GetUserById(userId);

            return Ok(data);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserAsync([FromBody] UpdateUserCustomerDTO dto)
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var data = await _userService.UpdateUserAsync(dto, userId);

            return Ok(data);
        }
    }
}