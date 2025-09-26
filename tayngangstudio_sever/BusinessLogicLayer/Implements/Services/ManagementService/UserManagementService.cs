using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IUserManagementService : ICrudService<CreateUserDTO, GetUserDTO, UpdateUserDTO, User>
    {
    }

    public class UserManagementService(IUnitOfWork _unitOfWork, IMapper _mapper)
        : CrudService<CreateUserDTO, GetUserDTO, UpdateUserDTO,
            User>(_unitOfWork, _mapper, ["Orders.OrderDetails.Product"]), IUserManagementService
    {
    }
}
