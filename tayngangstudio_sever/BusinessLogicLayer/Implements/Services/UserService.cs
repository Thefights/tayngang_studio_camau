using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IUserService
    {
        public Task<User> GetUserById(int id);
    }

    public class UserService(IUnitOfWork _unitOfWork) : IUserService
    {
        public async Task<User> GetUserById(int id)
        {
            return await _unitOfWork.Repository<User>().GetByIdAsync(id);
        }
    }
}