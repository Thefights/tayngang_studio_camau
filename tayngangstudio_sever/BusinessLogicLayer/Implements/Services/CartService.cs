using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Helpers;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface ICartService
    {
        Task AddCartItems(int cartId, CreateCartDTO cartItems);
        Task<GetCartDTO> GetCartByUserId(int userId);
        Task ClearCart(int cartId);
        Task UpdateCartItemQuantity(int cartId, int productId, int quantity);
    }

    public class CartService(IUnitOfWork _unitOfWork, IMapper _mapper) : ICartService
    {
        public async Task AddCartItems(int cartId, CreateCartDTO cartItems)
        {
            var cart = await GetCartById(cartId);

            foreach (var item in cartItems.CartItems)
            {
                var product = await GetProductById(item.ProductId);

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

        public async Task<GetCartDTO> GetCartByUserId(int userId)
        {
            var cartRepo = _unitOfWork.Repository<Cart>();
            var cart = await cartRepo.GetByCondition(c => c.UserId == userId, ["CartItems"]);

            if (cart == null)
            {
                throw new NotFoundException("Cart not found");
            }

            return _mapper.Map<GetCartDTO>(cart);
        }

        public async Task ClearCart(int cartId)
        {
            var cart = await GetCartById(cartId);
            cart.CartItems.Clear();
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateCartItemQuantity(int cartId, int productId, int quantity)
        {
            var cart = await GetCartById(cartId);
            var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);

            if (cartItem == null)
            {
                throw new NotFoundException("Cart item not found");
            }

            if (quantity <= 0)
            {
                cart.CartItems.Remove(cartItem);
            }

            else
            {
                cartItem.Quantity = quantity;
            }

            await _unitOfWork.SaveChangesAsync();
        }

        //Private methods
        private async Task<Product> GetProductById(int? productId)
        {
            var productRepo = _unitOfWork.Repository<Product>();
            var product = await productRepo.GetByIdAsync(productId);
            if (product == null)
            {
                throw new NotFoundException("Product not found");
            }
            return product;
        }

        private async Task<Cart> GetCartById(int? cartId)
        {
            var cartRepo = _unitOfWork.Repository<Cart>();
            var cart = await cartRepo.GetByIdAsync(cartId, ["CartItems"]);
            if (cart == null)
            {
                throw new NotFoundException("Cart not found");
            }
            return cart;
        }
    }
}