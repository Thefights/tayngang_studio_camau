using BusinessLogicLayer.DTO.ProductDTO;
using BusinessLogicLayer.Implements.Services.ManagementService;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using tayngangstudio_sever.Controllers.Base;

namespace tayngangstudio_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductManagementController(IProductManagementService _productService)
        : CrudController<ProductCreateDTO,
            ProductUpdateDTO,
            ProductGetDTO,
            Product>(_productService)
    {
    }
}