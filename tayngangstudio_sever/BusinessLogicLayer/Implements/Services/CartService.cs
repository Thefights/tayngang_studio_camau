using AutoMapper;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface ICartService : ICrudService<CreateCartDTO, GetCartDTO, UpdateCartDTO, Cart>
    {

    }
    public class CartService(IUnitOfWork _unitOfWork, IMapper _mapper) : CrudService<CreateCartDTO, GetCartDTO, UpdateCartDTO, Cart>(_unitOfWork, _mapper, ["CartItems"]), ICartService
    {
    }
}
