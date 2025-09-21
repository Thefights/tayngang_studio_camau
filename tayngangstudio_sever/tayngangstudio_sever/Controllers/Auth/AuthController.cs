using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO.UserDTO.AuthenticateDTO;
using BusinessLogicLayer.DTO.UserDTO.LoginDTO;
using BusinessLogicLayer.Implements.Services;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService _authService) : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(AuthUserRequestDTO dto)
        {
            var user = await _authService.RegisterAsync(dto);
            return Ok("Registration successful");
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var authResponse = await _authService.LoginAsync(dto);
            return Ok(new { Message = "Login successful", Data = authResponse });
        }

        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            await _authService.ForgotPasswordAsync(email);
            return Ok("A new password has been sent to your email.");
        }
    }
}