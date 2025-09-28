using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Helpers;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IUserService
    {
        Task<GetUserDTO> GetUserById(int userId);
        Task<GetUserDTO> UpdateUserAsync(UpdateUserCustomerDTO dto, int userId);
    }

    public class UserService(IUnitOfWork _unitOfWork, IMapper _mapper) : IUserService
    {
        public async Task<GetUserDTO> GetUserById(int userId)
        {
            var user = _unitOfWork.Repository<User>();
            var currentUser = await user.GetByIdAsync(userId);

            return _mapper.Map<GetUserDTO>(currentUser);
        }

        public async Task<GetUserDTO> UpdateUserAsync(UpdateUserCustomerDTO dto, int userId)
        {
            var userRepo = _unitOfWork.Repository<User>();
            var currentUser = await userRepo.GetByIdAsync(userId);

            if (currentUser == null)
            {
                throw new NotFoundException($"User with id {userId} not found");
            }

            _mapper.Map(dto, currentUser);

            userRepo.Update(currentUser);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<GetUserDTO>(currentUser);
        }
    }
}