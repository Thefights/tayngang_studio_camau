using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.DTO.OrderDTO;
using BusinessLogicLayer.Implements.Services.ManagementService;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using tayngangstudio_sever.Controllers.Base;

namespace tayngangstudio_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class OrderManagementController(IOrderService _orderService) : RuController<OrderGetDTO, OrderUpdateDTO, Order>(_orderService)
    {
    }
}
