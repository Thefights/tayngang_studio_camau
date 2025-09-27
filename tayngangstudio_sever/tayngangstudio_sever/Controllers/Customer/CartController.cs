using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using tayngangstudio_sever.Controllers.Base;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController(ICartService _cartService) : CrudController<CreateCartDTO, GetCartDTO, UpdateCartDTO, Cart>(_cartService)
    {
        [HttpPost("{cartId}/items")]
        public async Task<IActionResult> AddCartItems(int cartId, [FromBody] CreateCartDTO cartItems)
        {
            await _cartService.AddCartItems(cartId, cartItems);
            return NoContent();
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetCartByUserId()
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var cart = await _cartService.GetCartByUserId(userId);
            return Ok(new { Message = "Get cart by user ID successfully", Data = cart });
        }
    }
}