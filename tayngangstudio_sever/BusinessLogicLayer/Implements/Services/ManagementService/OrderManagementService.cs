using BusinessLogicLayer.DTO.OrderDTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IOrderManagementService : IRuService<OrderGetDTO, OrderUpdateDTO, Order>
    {
    }

    public class OrderManagementService(IUnitOfWork _unitOfWork) : RuService<OrderGetDTO, OrderUpdateDTO, Order>(_unitOfWork, ["OrderDetails"]), IOrderManagementService
    {
    }
}