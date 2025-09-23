using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IProductManagementService
        : ICrudService<ProductCreateDTO, ProductGetDTO, ProductUpdateDTO, Product>
    {
    }

    public class ProductManagementService(IUnitOfWork _unitOfWork, IMapper _mapper)
        : CrudService<ProductCreateDTO,
            ProductGetDTO,
            ProductUpdateDTO,
            Product>(_unitOfWork, _mapper), IProductManagementService
    {
    }
}