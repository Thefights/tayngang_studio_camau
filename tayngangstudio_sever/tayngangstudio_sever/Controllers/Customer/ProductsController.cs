using BusinessLogicLayer.Implements.Services;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(IProductService _service) : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id, IWebHostEnvironment env)
        {
            var product = await _service.GetProductById(id);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            return Ok(product);
        }

        [HttpGet("features")]
        public async Task<IActionResult> GetFeatureProductsBaseOrder()
        {
            var products = await _service.GetFeatureProductsBaseOrder();

            if (products == null || !products.Any())
            {
                return NotFound("No feature products found.");
            }

            return Ok(products);
        }

        [HttpGet("category/{productCategoryId}")]
        public async Task<IActionResult> GetProductsByCategory(int productCategoryId)
        {
            var products = await _service.GetProductsByCategory(productCategoryId);

            if (products == null || !products.Any())
            {
                return NotFound("No products found in this category.");
            }

            return Ok(products);
        }

        [HttpGet("name")]
        public async Task<IActionResult> GetProductByname()
        {
            var products = await _service.GetProductByname();

            if (products == null || !products.Any())
            {
                return NotFound("No products found.");
            }

            return Ok(products);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _service.GetAllProducts();

            if (products == null || !products.Any())
            {
                return NotFound("No products found.");
            }

            return Ok(products);
        }
    }
}