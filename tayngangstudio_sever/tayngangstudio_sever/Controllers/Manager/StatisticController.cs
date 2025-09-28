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
        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var data = await statisticService.GetAnalyticsDashboardAsync(startDate, endDate);
            return Ok(data);
        }
    }
}
