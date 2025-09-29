using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Implements.Services.ManagementService;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Mvc;
using tayngangstudio_sever.Controllers.Base;

namespace tayngangstudio_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class OrderManagementController(IOrderManagementService _orderService) : CrudController<CreateOrderDTO, GetOrderDTO, UpdateOrderDTO, Order>(_orderService)
    {
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateOrderDTO dto)
        {
            await _orderService.UpdateStatusAsync(id, dto.Status);
            return NoContent();
        }

        [NonAction]
        public override Task<IActionResult> UpdateAsync(int id, UpdateOrderDTO dto)
        {
            throw new NotImplementedException();
        }

    }
}