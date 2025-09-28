using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IUserManagementService : ICrudService<CreateUserDTO, GetUserDTO, UpdateUserDTO, User>
    {
    }

    public class UserManagementService(IUnitOfWork _unitOfWork, IMapper _mapper)
        : CrudService<CreateUserDTO, GetUserDTO, UpdateUserDTO,
            User>(_unitOfWork, _mapper, ["Orders.OrderDetails.Product"]), IUserManagementService
    {
        public override async Task<GetUserDTO> CreateAsync(CreateUserDTO dto)
        {
            if (await _unitOfWork.Repository<User>()
                .AnyAsync(u => u.Email == dto.Email || u.Phone == dto.Phone))
            {
                throw new BadHttpRequestException("Email or phone number already exists.");
            }

            return await base.CreateAsync(dto);
        }

        public override async Task UpdateAsync(int id, UpdateUserDTO dto)
        {
            if (await _unitOfWork.Repository<User>()
                      .AnyAsync(u => u.Phone == dto.Phone && u.Id != id))
            {
                throw new BadHttpRequestException("Phone number already exists.");
            }

            await base.UpdateAsync(id, dto);
        }
    }
}
