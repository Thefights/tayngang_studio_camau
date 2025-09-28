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

        [HttpGet("monthly")]
        public async Task<IActionResult> GetMonthly([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var data = await statisticService.GetMonthlyAnalyticsAsync(startDate, endDate);
            return Ok(data);
        }

        [HttpGet("top-products")]
        public async Task<IActionResult> GetTopProducts([FromQuery] DateTime startDate, [FromQuery] DateTime endDate, [FromQuery] int top = 5)
        {
            var data = await statisticService.GetTopProductsAsync(startDate, endDate, top);
            return Ok(data);
        }

        [HttpGet("customer-segments")]
        public async Task<IActionResult> GetCustomerSegments([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var data = await statisticService.GetCustomerSegmentsAsync(startDate, endDate);
            return Ok(data);
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var data = await statisticService.GetAnalyticsDashboardAsync(startDate, endDate);
            return Ok(data);
        }
    }
}
