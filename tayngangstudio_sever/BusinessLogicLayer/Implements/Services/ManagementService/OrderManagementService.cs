using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IOrderManagementService : ICrudService<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order>
    {
    }

    public class OrderManagementService(IUnitOfWork _unitOfWork, IMapper _mapper) : CrudService<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order>(_unitOfWork, _mapper, ["OrderDetails"]), IOrderManagementService
    {
    }
}