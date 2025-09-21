using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services.ManagementService;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using tayngangstudio_sever.Controllers.Base;

namespace tayngangstudio_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryManagementController(IProductCategoryManagementService _productCategoryService)
        : CrudController<ProductCategoryCreateDTO,
            ProductCategoryUpdateDTO,
            ProductCategoryGetDTO,
            ProductCategory>(_productCategoryService)
    {
    }
}
