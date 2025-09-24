using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements
{
    public interface IOrderService : ICrudService<OrderCreateDTO, OrderGetDTO, OrderUpdateDTO, Order> { }

    public class OrderService(IUnitOfWork _unitOfWork, IMapper _mapper) : CrudService<OrderCreateDTO, OrderGetDTO, OrderUpdateDTO, Order>(_unitOfWork, _mapper, ["OrderDetails"]), IOrderService
    {
        public override Task<OrderCreateDTO> CreateAsync(OrderCreateDTO dto)
        {
            var totalAmount = dto.OrderDetails.Sum(od => od.UnitPrice * od.Quantity);

            dto.TotalAmount = totalAmount;

            return base.CreateAsync(dto);
        }
    }
}