using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IOrderManagementService : ICrudService<OrderCreateDTO, OrderGetDTO, OrderUpdateDTO, Order>
    {
    }

    public class OrderManagementService(IUnitOfWork _unitOfWork) : CrudService<OrderCreateDTO, OrderGetDTO, OrderUpdateDTO, Order>(_unitOfWork, ["OrderDetails"]), IOrderManagementService
    {
    }
}