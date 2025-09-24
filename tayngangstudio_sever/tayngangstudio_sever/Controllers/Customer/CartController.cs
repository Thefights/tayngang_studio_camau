using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using tayngangstudio_sever.Controllers.Base;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController(ICartService _cartService) : CrudController<CreateCartDTO, UpdateCartDTO, GetCartDTO, Cart>(_cartService)
    {
    }
}