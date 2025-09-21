using BusinessLogicLayer.Attributes;
using BusinessLogicLayer.Implements.Services.ManagementService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace tayngangstudio_sever.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class StatisticController : ControllerBase
    {
        private readonly IStatisticService _statisticService;

        public StatisticController(IStatisticService statisticService)
        {
            _statisticService = statisticService;
        }

        [HttpGet("revenue")]
        public async Task<IActionResult> GetRevenueOverTime([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var revenue = await _statisticService.GetRevenueOverTimeAsync(startDate, endDate);
            return Ok(revenue);
        }

        [HttpGet("sales-by-product")]
        public async Task<IActionResult> GetSalesByProduct([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var sales = await _statisticService.GetSalesByProductAsync(startDate, endDate);
            return Ok(sales);
        }
    }
}
