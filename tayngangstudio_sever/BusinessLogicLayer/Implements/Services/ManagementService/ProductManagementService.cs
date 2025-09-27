using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IProductManagementService
        : ICrudService<CreateProductDTO, GetProductDTO, UpdateProductDTO, Product>
    {
    }

    public class ProductManagementService(IUnitOfWork _unitOfWork, IMapper _mapper, IImageUploadService _imageUploadService)
        : CrudService<CreateProductDTO, GetProductDTO, UpdateProductDTO,
            Product>(_unitOfWork, _mapper, null, _imageUploadService), IProductManagementService
    {
    }
}