using BusinessLogicLayer.DTO.StatisticDTOs;
using DataAccessLayer.Enums;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IStatisticService
    {
        Task<IEnumerable<MonthlyAnalyticsDTO>> GetMonthlyAnalyticsAsync(DateTime startDate, DateTime endDate);
        Task<IEnumerable<TopProductDTO>> GetTopProductsAsync(DateTime startDate, DateTime endDate, int top = 5);
        Task<AnalyticsDashboardDTO> GetAnalyticsDashboardAsync(DateTime startDate, DateTime endDate);
    }
    public class StatisticService(IUnitOfWork unitOfWork) : IStatisticService
    {
        public async Task<IEnumerable<MonthlyAnalyticsDTO>> GetMonthlyAnalyticsAsync(DateTime startDate, DateTime endDate)
        {
            // Get all orders within the date range
            var orders = await unitOfWork.Repository<Order>()
                .GetListByCondition(o => o.OrderDate >= startDate && o.OrderDate <= endDate);

            // Compute revenue from OrderDetails for only completed orders
            var completedOrderIds = orders
                .Where(o => o.Status == OrderStatusEnum.Completed)
                .Select(o => o.Id)
                .ToList();

            var orderDetails = completedOrderIds.Count == 0
                ? new List<OrderDetail>()
                : await unitOfWork.Repository<OrderDetail>()
                    .GetListByCondition(od => completedOrderIds.Contains(od.OrderId));

            var revenueByOrderId = orderDetails
                .GroupBy(od => od.OrderId)
                .ToDictionary(g => g.Key, g => g.Sum(od => od.Quantity * od.UnitPrice));

            var monthly = orders
                .GroupBy(o => new { o.OrderDate.Year, o.OrderDate.Month })
                .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Month)
                .Select(g => new MonthlyAnalyticsDTO
                {
                    Month = $"T{g.Key.Month}",
                    Revenue = g
                        .Where(o => o.Status == OrderStatusEnum.Completed)
                        .Sum(o => revenueByOrderId.TryGetValue(o.Id, out var rev) ? rev : 0d),
                    Orders = g.Count(),
                    Customers = g.Where(o => o.UserId.HasValue).Select(o => o.UserId!.Value).Distinct().Count()
                });

            return monthly;
        }

        public async Task<IEnumerable<TopProductDTO>> GetTopProductsAsync(DateTime startDate, DateTime endDate, int top = 5)
        {
            var orderDetails = await unitOfWork.Repository<OrderDetail>()
                .GetListByCondition(od => od.Order != null && od.Order.OrderDate >= startDate && od.Order.OrderDate <= endDate && od.Order.Status == OrderStatusEnum.Completed, new[] { "Product", "Order" });

            var topProducts = orderDetails
                .GroupBy(od => new { od.ProductId, od.Product!.Name })
                .Select(g => new TopProductDTO
                {
                    ProductId = g.Key.ProductId,
                    Name = g.Key.Name,
                    Sales = g.Sum(od => od.Quantity),
                    Revenue = g.Sum(od => od.Quantity * od.UnitPrice)
                })
                .OrderByDescending(p => p.Sales)
                .Take(top);

            return topProducts;
        }

        public async Task<AnalyticsDashboardDTO> GetAnalyticsDashboardAsync(DateTime startDate, DateTime endDate)
        {
            var monthly = await GetMonthlyAnalyticsAsync(startDate, endDate);
            var topProducts = await GetTopProductsAsync(startDate, endDate, 5);

            return new AnalyticsDashboardDTO
            {
                MonthlyData = monthly,
                TopProducts = topProducts,
            };
        }
    }
}
