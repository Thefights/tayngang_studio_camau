using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models.ProductEntities;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IProductCategoryService
        : ICrudService<ProductCategoryCreateDTO,
            ProductCategoryGetDTO,
            ProductCategoryUpdateDTO,
            ProductCategory>
    {
    }

    public class ProductCategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        : CrudService<ProductCategoryCreateDTO,
            ProductCategoryGetDTO,
            ProductCategoryUpdateDTO,
            ProductCategory>(unitOfWork, mapper), IProductCategoryService
    {
    }
}
