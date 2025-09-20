using AutoMapper;
using BusinessLogicLayer.DTO.ProductDTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models.ProductEntities;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IProductService
        : ICrudService<ProductCreateDTO, ProductGetDTO, ProductUpdateDTO, Product>
    {
    }

    public class ProductService(IUnitOfWork unitOfWork, IImageUploadService imageUploadService, IMapper mapper)
        : CrudService<ProductCreateDTO,
            ProductGetDTO,
            ProductUpdateDTO,
            Product>(unitOfWork, mapper, imageUploadService), IProductService
    {
    }
}