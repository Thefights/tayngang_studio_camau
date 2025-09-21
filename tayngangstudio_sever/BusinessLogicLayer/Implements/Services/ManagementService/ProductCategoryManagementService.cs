using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models.ProductEntities;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IProductCategoryManagementService
        : ICrudService<ProductCategoryCreateDTO,
            ProductCategoryGetDTO,
            ProductCategoryUpdateDTO,
            ProductCategory>
    {
    }

    public class ProductCategoryManagementService(IUnitOfWork unitOfWork, IMapper mapper)
        : CrudService<ProductCategoryCreateDTO,
            ProductCategoryGetDTO,
            ProductCategoryUpdateDTO,
            ProductCategory>(unitOfWork, mapper), IProductCategoryManagementService
    {
    }
}
