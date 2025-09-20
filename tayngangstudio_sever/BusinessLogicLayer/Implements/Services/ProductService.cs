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
        public Task<Product> CreateProductWithImageAsync(Product product, IFormFile imageFile);
    }

    public class ProductService(IUnitOfWork _unitOfWork, IImageService _imageService, IMapper _mapper) : CrudService<ProductCreateDTO, ProductGetDTO, ProductUpdateDTO, Product>(_unitOfWork, _mapper, _imageService), IProductService
    {

        public async Task<Product> CreateProductWithImageAsync(Product product, IFormFile imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                var imageUrlResult = await _imageService.UploadImageAsync(imageFile, "chaolong-bucket");
                product.ImageUrl = imageUrlResult;
            }

            await _unitOfWork.Repository<Product>().CreateAsync(product);
            await _unitOfWork.SaveChangesAsync();

            return product;
        }
    }
}