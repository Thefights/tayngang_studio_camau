using AutoMapper;
using BusinessLogicLayer.DTO;
using DataAccessLayer.Data;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IProductService
    {
        Task<GetProductDTO> GetProductById(int id);
        Task<IEnumerable<GetProductDTO>> GetAllProducts();
        Task<IEnumerable<GetProductDTO>> GetFeatureProductsBaseOrder();
        Task<IEnumerable<GetProductDTO>> GetProductsByCategory(string name);
        Task<IEnumerable<GetProductDTO>> SearchProduct(string searchTerm);
    }

    public class ProductService(IUnitOfWork _unitOfWork, IMapper _mapper, ApplicationDbContext _dbContext) : IProductService
    {
        string[]? _include = ["ProductCategory"];

        public async Task<IEnumerable<GetProductDTO>> GetAllProducts()
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync(_include);

            var validProduct = products.Where(p => p.Quantity > 0);

            return _mapper.Map<IEnumerable<GetProductDTO>>(validProduct);
        }

        public async Task<GetProductDTO> GetProductById(int id)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id, _include);
            return _mapper.Map<GetProductDTO>(product);
        }

        public async Task<IEnumerable<GetProductDTO>> GetFeatureProductsBaseOrder()
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync(_include);

            var featureProducts = products
                .OrderByDescending(p => p.OrderDetails.Count)
                .Take(4);

            return _mapper.Map<IEnumerable<GetProductDTO>>(featureProducts);
        }

        public async Task<IEnumerable<GetProductDTO>> GetProductsByCategory(string name)
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync(_include);

            var categoryProducts = products
                .Where(p => p.ProductCategory?.Name == name).ToList();


            return _mapper.Map<IEnumerable<GetProductDTO>>(categoryProducts);
        }

        public async Task<IEnumerable<GetProductDTO>> SearchProduct(string searchTerm)
        {
            var products = await _unitOfWork.Repository<Product>().GetAllAsync(_include);

            var nameProducts = products
                .Where(p => p.Name.Contains(searchTerm, StringComparison.OrdinalIgnoreCase));

            return _mapper.Map<IEnumerable<GetProductDTO>>(nameProducts);
        }
    }
}