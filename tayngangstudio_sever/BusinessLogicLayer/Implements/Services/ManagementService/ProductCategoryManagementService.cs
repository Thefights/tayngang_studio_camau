using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IProductCategoryManagementService
        : ICrudService<CreateProductCategoryDTO,
            GetProductCategoryDTO,
            UpdateProductCategoryDTO,
            ProductCategory>
    {
    }

    public class ProductCategoryManagementService(IUnitOfWork _unitOfWork, IMapper _mapper)
        : CrudService<CreateProductCategoryDTO,
            GetProductCategoryDTO,
            UpdateProductCategoryDTO,
            ProductCategory>(_unitOfWork, _mapper), IProductCategoryManagementService
    {
    }
}