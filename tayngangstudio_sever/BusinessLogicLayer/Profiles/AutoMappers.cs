using AutoMapper;
using BusinessLogicLayer.DTO;
using DataAccessLayer.Models;

namespace BusinessLogicLayer.Profiles
{
    public class AutoMappers : Profile
    {
        public AutoMappers()
        {
            //Product
            CreateMap<Product, CreateProductDTO>().ReverseMap();
            CreateMap<Product, UpdateProductDTO>().ReverseMap();
            CreateMap<Product, GetProductDTO>().ReverseMap();

            //ProductCategory
            CreateMap<ProductCategory, CreateProductCategoryDTO>().ReverseMap();
            CreateMap<ProductCategory, UpdateProductCategoryDTO>().ReverseMap();
            CreateMap<ProductCategory, GetProductCategoryDTO>().ReverseMap();

            //Order
            CreateMap<Order, CreateOrderDTO>().ReverseMap();
            CreateMap<Order, UpdateOrderDTO>().ReverseMap();
            CreateMap<Order, GetOrderDTO>().ReverseMap();

            //OrderDetail
            CreateMap<OrderDetail, GetOrderDetailDTO>().ReverseMap();

            //Cart
            CreateMap<Cart, GetCartDTO>().ReverseMap();
            CreateMap<Cart, UpdateCartDTO>().ReverseMap();
            CreateMap<Cart, CreateCartDTO>().ReverseMap();

            //CartItem
            CreateMap<CartItem, GetCartItemDTO>().ReverseMap();


            //User
            CreateMap<User, RegisterDTO>().ReverseMap();
            CreateMap<User, LoginRequestDTO>().ReverseMap();
            CreateMap<User, LoginRespondDTO>().ReverseMap();

            CreateMap<User, GetUserDTO>().ReverseMap();
            CreateMap<User, UpdateUserDTO>().ReverseMap();
            CreateMap<User, CreateUserDTO>().ReverseMap();
        }
    }
}