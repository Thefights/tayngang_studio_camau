using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
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

    public class ProductCategoryManagementService(IUnitOfWork _unitOfWork, IMapper _mapper)
        : CrudService<ProductCategoryCreateDTO,
            ProductCategoryGetDTO,
            ProductCategoryUpdateDTO,
            ProductCategory>(_unitOfWork, _mapper), IProductCategoryManagementService
    {
    }
}