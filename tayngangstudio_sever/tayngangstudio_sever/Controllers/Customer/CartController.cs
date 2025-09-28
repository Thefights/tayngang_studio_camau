using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController(ICartService _cartService) : ControllerBase
    {
        [HttpPost("/items")]
        public async Task<IActionResult> AddCartItems([FromBody] CreateCartDTO cartItems)
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var cart = await _cartService.GetCartByUserId(userId);

            await _cartService.AddCartItems(cart.Id, cartItems);
            return NoContent();
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetCartByUserId()
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var cart = await _cartService.GetCartByUserId(userId);
            return Ok(new { Message = "Get cart by user ID successfully", Data = cart });
        }

        [HttpPut("/items/{cartItemId}")]
        public async Task<IActionResult> UpdateCartItemQuantity(int cartItemId, int quantity)
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var cart = await _cartService.GetCartByUserId(userId);
            await _cartService.UpdateCartItemQuantity(cart.Id, cartItemId, quantity);
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> ClearCart()
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var cart = await _cartService.GetCartByUserId(userId);
            await _cartService.ClearCart(cart.Id);
            return NoContent();
        }
    }
}