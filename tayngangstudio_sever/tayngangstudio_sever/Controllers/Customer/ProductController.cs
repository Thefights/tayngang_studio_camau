//using BusinessLogicLayer.Implements.Services;
//using Microsoft.AspNetCore.Mvc;

//namespace tayngangstudio_sever.Controllers.Customer
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ProductController(IProductService _service) : ControllerBase
//    {
//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetProductById(int id, IWebHostEnvironment env)
//        {
//            var product = await _service.GetProductById(id);

//            if (product == null)
//            {
//                return NotFound("Product not found.");
//            }

//            return Ok(product);
//        }

//        [HttpGet("all")]
//        public async Task<IActionResult> GetAllProducts()
//        {
//            var products = await _service.GetAllProducts();

//            if (products == null || !products.Any())
//            {
//                return NotFound("No products found.");
//            }

//            return Ok(products);
//        }

//        [HttpGet("features")]
//        public async Task<IActionResult> GetFeatureProduct()
//        {
//            var products = await _service.GetFeatureProductsBaseOrder();

//            if (products == null || !products.Any())
//            {
//                return NotFound("No feature products found.");
//            }

//            return Ok(products);
//        }

//        [HttpGet("category/{name}")]
//        public async Task<IActionResult> GetProductsByCategory(string name)
//        {
//            var products = await _service.GetProductsByCategory(name);

//            if (products == null || !products.Any())
//            {
//                return NotFound("No products found in this category.");
//            }

//            return Ok(products);
//        }

//        [HttpGet("search/{searchTerm}")]
//        public async Task<IActionResult> SearchProduct(string searchTerm)
//        {
//            var products = await _service.SearchProduct(searchTerm);

//            if (products == null || !products.Any())
//            {
//                return NotFound("No products found.");
//            }

//            return Ok(products);
//        }
//    }
//}