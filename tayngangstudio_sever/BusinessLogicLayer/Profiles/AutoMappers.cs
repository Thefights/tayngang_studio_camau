using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.DTO.OrderDetailDTO;
using BusinessLogicLayer.DTO.OrderDTO;
using BusinessLogicLayer.DTO.ProductDTO;
using BusinessLogicLayer.DTO.UserDTO.AuthenticateDTO;
using DataAccessLayer.Models.OrderEntities;
using DataAccessLayer.Models.ProductEntities;
using DataAccessLayer.Models.UserEntities;

namespace BusinessLogicLayer.Profiles
{
    public class AutoMappers : Profile
    {
        public AutoMappers()
        {
            //Product
            CreateMap<Product, ProductCreateDTO>().ReverseMap();
            CreateMap<Product, ProductUpdateDTO>().ReverseMap();
            CreateMap<Product, ProductGetDTO>().ReverseMap();

            //ProductCategory
            CreateMap<ProductCategory, ProductCategoryCreateDTO>().ReverseMap();
            CreateMap<ProductCategory, ProductCategoryUpdateDTO>().ReverseMap();
            CreateMap<ProductCategory, ProductCategoryGetDTO>().ReverseMap();

            //Order
            CreateMap<Order, OrderUpdateDTO>().ReverseMap();
            CreateMap<Order, OrderGetDTO>().ReverseMap();

            //OrderDetail
            CreateMap<OrderDetail, OrderDetailGetDTO>().ReverseMap();

            //User
            CreateMap<User, AuthUserRequestDTO>().ReverseMap();
            CreateMap<User, AuthUserRespondDTO>().ReverseMap();
        }
    }
}