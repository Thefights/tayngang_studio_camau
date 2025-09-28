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
        [HttpPost("items")]
        public async Task<IActionResult> AddCartItems([FromBody] CreateCartItemDTO cartItems)
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
            return Ok(cart);
        }

        [HttpPatch("items/{productId}/increase")]
        public async Task<IActionResult> IncreaseCartItem(int productId)
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var cart = await _cartService.GetCartByUserId(userId);
            await _cartService.IncreaseQuantity(cart.Id, productId);
            return NoContent();
        }

        [HttpPatch("items/{productId}/decrease")]
        public async Task<IActionResult> DecreaseCartItem(int productId)
        {
            var userId = int.Parse(User.FindFirst("id")!.Value);
            var cart = await _cartService.GetCartByUserId(userId);
            await _cartService.DecreaseQuantity(cart.Id, productId);
            return NoContent();
        }

        [HttpDelete("items/{productId}")]
        public async Task<IActionResult> RemoveCartItem(int productId)
        {
            await _cartService.RemoveCartItem(productId);
            return NoContent();
        }
    }
}