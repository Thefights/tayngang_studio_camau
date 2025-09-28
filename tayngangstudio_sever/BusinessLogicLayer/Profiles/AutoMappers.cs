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
            CreateMap<Product, ProductOrderDetailDTO>().ReverseMap();

            //ProductCategory
            CreateMap<ProductCategory, CreateProductCategoryDTO>().ReverseMap();
            CreateMap<ProductCategory, UpdateProductCategoryDTO>().ReverseMap();
            CreateMap<ProductCategory, GetProductCategoryDTO>().ReverseMap();

            //Order
            CreateMap<Order, CreateOrderDTO>().ReverseMap()
                .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails))
                .ForMember(dest => dest.TotalAmount, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore());
            CreateMap<Order, UpdateOrderDTO>().ReverseMap();
            CreateMap<Order, GetOrderDTO>()
                .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails));
            CreateMap<GetOrderDTO, Order>()
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.OrderDetails, opt => opt.Ignore());

            //OrderDetail
            CreateMap<OrderDetail, GetOrderDetailDTO>()
                .ForMember(dest => dest.Product, opt => opt.MapFrom(src => src.Product));
            CreateMap<GetOrderDetailDTO, OrderDetail>();
            CreateMap<CreateOrderDetailDTO, OrderDetail>()
                .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId))
                .ForMember(dest => dest.OrderId, opt => opt.Ignore())
                .ForMember(dest => dest.Order, opt => opt.Ignore())
                .ForMember(dest => dest.Product, opt => opt.Ignore());
            CreateMap<OrderDetail, CreateOrderDetailDTO>();

            //Cart
            CreateMap<Cart, GetCartDTO>().ReverseMap();
            CreateMap<Cart, UpdateCartDTO>().ReverseMap();
            CreateMap<Cart, CreateCartDTO>().ReverseMap();

            //CartItem
            CreateMap<CartItem, GetCartItemDTO>()
                .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ProductId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.Product != null ? s.Product.Name : string.Empty))
                .ForMember(d => d.ProductImageUrl, o => o.MapFrom(s => s.Product != null ? s.Product.ImageUrl : string.Empty))
                .ForMember(d => d.UnitPrice, o => o.MapFrom(s => s.UnitPrice))
                .ForMember(d => d.Quantity, o => o.MapFrom(s => s.Quantity));
            CreateMap<CartItem, CreateCartItemDTO>().ReverseMap();


            //User
            CreateMap<User, RegisterDTO>().ReverseMap();
            CreateMap<User, LoginRequestDTO>().ReverseMap();
            CreateMap<User, LoginRespondDTO>().ReverseMap();

            CreateMap<User, GetUserDTO>()
                .ForMember(dest => dest.Orders, opt => opt.MapFrom(src => src.Orders));
            CreateMap<GetUserDTO, User>();
            CreateMap<User, UpdateUserDTO>().ReverseMap();
            CreateMap<User, CreateUserDTO>().ReverseMap();
        }
    }
}