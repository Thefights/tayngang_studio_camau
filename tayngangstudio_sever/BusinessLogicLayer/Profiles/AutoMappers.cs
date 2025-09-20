using AutoMapper;
using BusinessLogicLayer.DTO.OrderDetailDTO;
using BusinessLogicLayer.DTO.OrderDTO;
using BusinessLogicLayer.DTO.ProductDTO;
using BusinessLogicLayer.DTO.UserDTO.AuthenticateDTO;
using BusinessLogicLayer.DTO.VoucherDTO;
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

            //Voucher
            CreateMap<Voucher, VoucherCreateDTO>().ReverseMap();
            CreateMap<Voucher, VoucherUpdateDTO>().ReverseMap();
            CreateMap<Voucher, VoucherGetDTO>().ReverseMap();

            //Order
            CreateMap<Order, OrderUpdateDTO>().ReverseMap();
            CreateMap<Order, OrderGetDTO>().ReverseMap();

            //OrderDetail
            CreateMap<OrderDetail, OrderDetailGetDTO>().ReverseMap();

            //User
            CreateMap<User, AuthUserRequestDTO>().ReverseMap();
            //CreateMap<User, AuthUserRespondDTO>().ReverseMap();
        }
    }
}