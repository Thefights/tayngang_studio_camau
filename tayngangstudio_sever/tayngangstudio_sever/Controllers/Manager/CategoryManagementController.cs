using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services.ManagementService;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using tayngangstudio_sever.Controllers.Base;

namespace tayngangstudio_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class CategoryManagementController(IProductCategoryManagementService _productCategoryService)
        : CrudController<CreateProductCategoryDTO, GetProductCategoryDTO, UpdateProductCategoryDTO, ProductCategory>(_productCategoryService)
    { }
}
