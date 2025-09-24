using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IUserManagementService : ICrudService<UserCreateDTO, UserGetDTO, UserUpdateDTO, User>
    {
    }

    public class UserManagementService(IUnitOfWork _unitOfWork, IMapper _mapper)
        : CrudService<UserCreateDTO,
            UserGetDTO,
            UserUpdateDTO,
            User>(_unitOfWork, _mapper), IUserManagementService
    {
    }
}
