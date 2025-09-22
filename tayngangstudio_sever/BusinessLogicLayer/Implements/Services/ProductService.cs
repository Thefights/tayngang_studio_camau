using AutoMapper;
using BusinessLogicLayer.DTO;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IProductService
    {
        Task<ProductGetDTO> GetProductById(int id);
        Task<IEnumerable<ProductGetDTO>> GetAllProducts();
        Task<IEnumerable<ProductGetDTO>> GetFeatureProductsBaseOrder();
        Task<IEnumerable<ProductGetDTO>> GetProductsByCategory(string name);
        Task<IEnumerable<ProductGetDTO>> SearchProduct(string searchTerm);
    }

    public class ProductService(IUnitOfWork _unitOfWork, IMapper _mapper, ApplicationDbContext _dbContext) : IProductService
    {
        string[]? _include = ["ProductCategory"];

        public async Task<IEnumerable<ProductGetDTO>> GetAllProducts()
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync(_include);

            var validProduct = products.Where(p => p.Quantity > 0);

            return _mapper.Map<IEnumerable<ProductGetDTO>>(validProduct);
        }

        public async Task<ProductGetDTO> GetProductById(int id)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id, _include);
            return _mapper.Map<ProductGetDTO>(product);
        }

        public async Task<IEnumerable<ProductGetDTO>> GetFeatureProductsBaseOrder()
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync(_include);

            var featureProducts = products
                .OrderByDescending(p => p.OrderDetails.Count)
                .Take(4);

            return _mapper.Map<IEnumerable<ProductGetDTO>>(featureProducts);
        }

        public async Task<IEnumerable<ProductGetDTO>> GetProductsByCategory(string name)
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync(_include);

            var categoryProducts = products
                .Where(p => p.ProductCategory?.Name == name).ToList();


            return _mapper.Map<IEnumerable<ProductGetDTO>>(categoryProducts);
        }

        public async Task<IEnumerable<ProductGetDTO>> SearchProduct(string searchTerm)
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync(_include);

            var nameProducts = products
                .Where(p => p.Name.Contains(searchTerm, StringComparison.OrdinalIgnoreCase));

            return _mapper.Map<IEnumerable<ProductGetDTO>>(nameProducts);
        }
    }
}