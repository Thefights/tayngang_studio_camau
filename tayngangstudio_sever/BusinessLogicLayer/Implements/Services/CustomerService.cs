using AutoMapper;
using BusinessLogicLayer.DTO.OrderDTO;
using BusinessLogicLayer.DTO.UserDTO;
using BusinessLogicLayer.Helpers;
using DataAccessLayer.Models.OrderEntities;
using DataAccessLayer.Models.UserEntities;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface ICustomerService
    {
        Task<UserGetDTO> GetUserProfileAsync(int userId);
        Task UpdateUserProfileAsync(int userId, UserUpdateDTO userUpdateDTO);
        Task<IEnumerable<OrderGetDTO>> GetUserOrdersAsync(int userId);
    }

    public class CustomerService(IUnitOfWork unitOfWork, IMapper mapper) : ICustomerService
    {
        public async Task<UserGetDTO> GetUserProfileAsync(int userId)
        {
            var user = await unitOfWork.Repository<User>().GetByIdAsync(userId);
            return user == null ? throw new AppException("User not found.") : mapper.Map<UserGetDTO>(user);
        }

        public async Task UpdateUserProfileAsync(int userId, UserUpdateDTO userUpdateDTO)
        {
            var user = await unitOfWork.Repository<User>().GetByIdAsync(userId) ?? throw new AppException("User not found.");
            mapper.Map(userUpdateDTO, user);
            unitOfWork.Repository<User>().Update(user);
            await unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<OrderGetDTO>> GetUserOrdersAsync(int userId)
        {
            var orders = await unitOfWork.Repository<Order>().GetListByCondition(o => o.UserId == userId, ["OrderDetails"]);
            return mapper.Map<IEnumerable<OrderGetDTO>>(orders);
        }
    }
}
