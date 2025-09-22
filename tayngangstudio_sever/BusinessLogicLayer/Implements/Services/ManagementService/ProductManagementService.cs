using BusinessLogicLayer.DTO.ProductDTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IProductManagementService
        : ICrudService<ProductCreateDTO, ProductGetDTO, ProductUpdateDTO, Product>
    {
    }

    public class ProductManagementService(IUnitOfWork unitOfWork)
        : CrudService<ProductCreateDTO,
            ProductGetDTO,
            ProductUpdateDTO,
            Product>(unitOfWork), IProductManagementService
    {
    }
}