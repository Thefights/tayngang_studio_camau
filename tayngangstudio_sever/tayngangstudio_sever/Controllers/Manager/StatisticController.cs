using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.Implements.Services.ManagementService;
using Microsoft.AspNetCore.Mvc;

namespace tayngangstudio_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class StatisticController(IStatisticService statisticService) : ControllerBase
    {
        [HttpGet("revenue")]
        public async Task<IActionResult> GetRevenueOverTime([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var revenue = await statisticService.GetRevenueOverTimeAsync(startDate, endDate);
            return Ok(revenue);
        }

        [HttpGet("sales-by-product")]
        public async Task<IActionResult> GetSalesByProduct([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var sales = await statisticService.GetSalesByProductAsync(startDate, endDate);
            return Ok(sales);
        }
    }
}
