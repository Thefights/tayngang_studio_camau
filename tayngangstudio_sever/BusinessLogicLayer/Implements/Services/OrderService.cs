using AutoMapper;
using BusinessLogicLayer.DTO;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IOrderService
    {
        Task<List<GetOrderDTO>> GetOrdersByCurrentUser(int userId);
        Task<GetOrderDTO> CreateOrderAsync(CreateOrderDTO dto);
    }

    public class OrderService(IUnitOfWork _unitOfWork, IMapper _mapper) : IOrderService
    {
        public async Task<List<GetOrderDTO>> GetOrdersByCurrentUser(int userId)
        {
            var orders = await _unitOfWork.Repository<Order>()
                .GetListByCondition(u => u.UserId == userId, ["OrderDetails"]);

            return _mapper.Map<List<GetOrderDTO>>(orders);
        }


        public async Task<GetOrderDTO> CreateOrderAsync(CreateOrderDTO dto)
        {
            var totalAmount = 0;

            foreach (var item in dto.OrderDetails)
            {
                totalAmount += item.Quantity * (int)item.UnitPrice;
            }

            var entity = _mapper.Map<Order>(dto);
            entity.TotalAmount = totalAmount;

            await _unitOfWork.Repository<Order>().CreateAsync(entity);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<GetOrderDTO>(entity);
        }
    }
}