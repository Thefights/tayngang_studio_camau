using BusinessLogicLayer.DTO.VoucherDTO;
using BusinessLogicLayer.Implements.Services;
using DataAccessLayer.Models.UserEntities;
using Microsoft.AspNetCore.Mvc;
using tayngangstudio_sever.Controllers.Base;

namespace tayngangstudio_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherManagementController(IVoucherService _voucherService) : CrudController<VoucherCreateDTO, VoucherUpdateDTO, VoucherGetDTO, Voucher>(_voucherService)
    {
    }
}