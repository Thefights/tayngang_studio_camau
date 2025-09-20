using AutoMapper;
using BusinessLogicLayer.DTO.VoucherDTO;
using BusinessLogicLayer.Implements.Base;
using DataAccessLayer.Models.UserEntities;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IVoucherService : ICrudService<VoucherCreateDTO, VoucherGetDTO, VoucherUpdateDTO, Voucher>
    {
    }

    public class VoucherService(IUnitOfWork _unitOfWork, IMapper _mapper) : CrudService<VoucherCreateDTO, VoucherGetDTO, VoucherUpdateDTO, Voucher>(_unitOfWork, _mapper), IVoucherService
    {
        //public async Task<Voucher> GetVoucherByCodeAsync(string code)
        //{
        //    var voucher = await _unitOfWork.Repository<Voucher>().GetByCondition(v => v.Code == code);
        //    return voucher;
        //}
    }
}