using AutoMapper;
using BusinessLogicLayer.DTO.ProductDTO;
using DataAccessLayer.Models.ProductEntities;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IProductService
    {
        Task<ProductGetDTO> GetProductById(int id);
        Task<IEnumerable<ProductGetDTO>> GetFeatureProductsBaseOrder();
        Task<IEnumerable<ProductGetDTO>> GetProductsByCategory(int productCategoryId);
        Task<IEnumerable<ProductGetDTO>> GetProductByname();
        Task<IEnumerable<ProductGetDTO>> GetAllProducts();
    }

    public class ProductService(IUnitOfWork _unitOfWork, IMapper _mapper) : IProductService
    {
        public async Task<IEnumerable<ProductGetDTO>> GetAllProducts()
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync();

            var validProduct = products.Where(p => p.Quantity > 0);

            return _mapper.Map<IEnumerable<ProductGetDTO>>(validProduct);
        }

        public async Task<ProductGetDTO> GetProductById(int id)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);
            return _mapper.Map<ProductGetDTO>(product);
        }

        public async Task<IEnumerable<ProductGetDTO>> GetFeatureProductsBaseOrder()
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync();

            var featureProducts = products
                .OrderByDescending(p => p.OrderDetails.Count)
                .Take(4);

            return _mapper.Map<IEnumerable<ProductGetDTO>>(featureProducts);
        }

        public async Task<IEnumerable<ProductGetDTO>> GetProductsByCategory(int productCategoryId)
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync();

            var categoryProducts = products
                .Where(p => p.ProductCategoryId == productCategoryId);

            return _mapper.Map<IEnumerable<ProductGetDTO>>(categoryProducts);
        }

        public async Task<IEnumerable<ProductGetDTO>> GetProductByname()
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync();

            var nameProducts = products
                .OrderBy(p => p.Name);

            return _mapper.Map<IEnumerable<ProductGetDTO>>(nameProducts);
        }
    }
}