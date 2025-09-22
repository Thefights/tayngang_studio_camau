using AutoMapper;
using BusinessLogicLayer.DTO.OrderDTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IOrderManagementService : IRuService<OrderGetDTO, OrderUpdateDTO, Order>
    {
    }

    public class OrderManagementService(IUnitOfWork _unitOfWork, IMapper _mapper) : RuService<OrderGetDTO, OrderUpdateDTO, Order>(_unitOfWork, _mapper, new[] { "OrderDetails" }), IOrderManagementService
    {
    }
}