using AutoMapper;
using BusinessLogicLayer.DTO.OrderDTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models.OrderEntities;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IOrderService : IRuService<OrderGetDTO, OrderUpdateDTO, Order>
    {
    }

    public class OrderService(IUnitOfWork _unitOfWork, IMapper _mapper) : RuService<OrderGetDTO, OrderUpdateDTO, Order>(_unitOfWork, _mapper, new[] { "OrderDetails" }), IOrderService
    {
        //public async Task<IEnumerable<OrderGetDTO>> GetOrderIncludeOrderDetail()
        //{
        //    var orders = await _unitOfWork.Repository<Order>().GetAllAsync("OrderDetails");
        //    return _mapper.Map<IEnumerable<OrderGetDTO>>(orders);
        //}
    }
}