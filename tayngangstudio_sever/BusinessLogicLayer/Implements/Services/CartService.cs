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
        Task AddCartItems(int cartId, CreateCartDTO cartItems);
    }
    public class CartService(IUnitOfWork _unitOfWork, IMapper _mapper) : CrudService<CreateCartDTO, GetCartDTO, UpdateCartDTO, Cart>(_unitOfWork, _mapper, ["CartItems"]), ICartService
    {
        public async Task AddCartItems(int cartId, CreateCartDTO cartItems)
        {
            var cartRepo = _unitOfWork.Repository<Cart>();
            var cart = await cartRepo.GetByIdAsync(cartId, ["CartItems"]);

            if (cart == null)
            {
                throw new NotFoundException("Cart not found");
            }

            foreach (var item in cartItems.CartItems)
            {
                var productExist = await IsProductExist(item.ProductId);
                if (!productExist)
                {
                    throw new NotFoundException($"Product not found: {item.ProductId}");
                }
                var existingCartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == item.ProductId);
                if (existingCartItem != null)
                {
                    existingCartItem.Quantity += item.Quantity;
                }
                else
                {
                    var newCartItem = _mapper.Map<CartItem>(item);
                    newCartItem.CartId = cartId;
                    cart.CartItems.Add(newCartItem);
                }
            }
            await _unitOfWork.SaveChangesAsync();
        }

        private async Task<bool> IsProductExist(int? productId)
        {
            var productRepo = _unitOfWork.Repository<Product>();
            var product = await productRepo.GetByIdAsync(productId);
            return product != null;
        }
    }
}