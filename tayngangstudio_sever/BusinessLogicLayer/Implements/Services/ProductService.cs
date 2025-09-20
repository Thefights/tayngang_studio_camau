using AutoMapper;
using BusinessLogicLayer.DTO.ProductDTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models.ProductEntities;
using DataAccessLayer.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IProductService : ICrudService<ProductCreateDTO, ProductGetDTO, ProductUpdateDTO, Product>
    {
    }

    public class ProductService : CrudService<ProductCreateDTO, ProductGetDTO, ProductUpdateDTO, Product>, IProductService
    {
        public ProductService(IUnitOfWork unitOfWork, IImageUploadService imageUploadService, IMapper mapper) 
            : base(unitOfWork, mapper, imageUploadService)
        {
        }
    }
}