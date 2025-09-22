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
            CreateMap<User, LoginRequestDTO>().ReverseMap();
            CreateMap<User, LoginResponDTO>().ReverseMap();
        }
    }
}