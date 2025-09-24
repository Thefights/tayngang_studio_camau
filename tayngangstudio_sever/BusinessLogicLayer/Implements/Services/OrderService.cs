using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IOrderService : ICrudService<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order> { }

    public class OrderService(IUnitOfWork _unitOfWork, IMapper _mapper) : CrudService<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order>(_unitOfWork, _mapper, ["OrderDetails"]), IOrderService
    {
        public override Task<CreateOrderDTO> CreateAsync(CreateOrderDTO dto)
        {
            var totalAmount = dto.OrderDetails.Sum(od => od.UnitPrice * od.Quantity);

            dto.TotalAmount = totalAmount;

            return base.CreateAsync(dto);
        }
    }
}