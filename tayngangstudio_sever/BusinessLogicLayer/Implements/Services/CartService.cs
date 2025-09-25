using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Helpers;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface ICartService : ICrudService<CreateCartDTO, GetCartDTO, UpdateCartDTO, Cart>
    {

    }
    public class CartService(IUnitOfWork _unitOfWork, IMapper _mapper) : CrudService<CreateCartDTO, GetCartDTO, UpdateCartDTO, Cart>(_unitOfWork, _mapper, ["CartItems"]), ICartService
    {
        public override async Task<CreateCartDTO> CreateAsync(CreateCartDTO dto)
        {
            var userExists = await IsUserExist(dto.UserId);

            if (!userExists)
            {
                throw new NotFoundException("User not found");
            }

            foreach (var item in dto.CartItems)
            {
                var productExist = await IsProductExist(item.ProductId);

                if (!productExist)
                {
                    throw new NotFoundException($"Product not found: {item.ProductId}");
                }
            }

            return await base.CreateAsync(dto);
        }

        private async Task<bool> IsUserExist(int? userId)
        {
            var userRepo = _unitOfWork.Repository<User>();
            var user = await userRepo.GetByIdAsync(userId);
            return user != null;
        }

        private async Task<bool> IsProductExist(int? productId)
        {
            var productRepo = _unitOfWork.Repository<Product>();
            var product = await productRepo.GetByIdAsync(productId);
            return product != null;
        }
    }
}