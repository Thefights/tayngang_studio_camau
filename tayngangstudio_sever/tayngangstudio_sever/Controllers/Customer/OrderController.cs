using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using tayngangstudio_sever.Controllers.Base;

namespace tayngangstudio_sever.Controllers.Customer
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController(IOrderService _orderService) : CrudController<OrderCreateDTO, OrderGetDTO, OrderUpdateDTO, Order>(_orderService)
    {
    }
}