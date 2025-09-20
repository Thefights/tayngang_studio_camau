using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services;
using DataAccessLayer.Models.ProductEntities;
using Microsoft.AspNetCore.Mvc;
using tayngangstudio_sever.Controllers.Base;

namespace tayngangstudio_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryManagementController(IProductCategoryService _productCategoryService)
        : CrudController<ProductCategoryCreateDTO,
            ProductCategoryUpdateDTO,
            ProductCategoryGetDTO,
            ProductCategory>(_productCategoryService)
    {
    }
}
