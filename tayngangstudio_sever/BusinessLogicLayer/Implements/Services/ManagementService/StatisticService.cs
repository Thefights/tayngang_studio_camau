using BusinessLogicLayer.DTO.StatisticDTOs;
using DataAccessLayer.Enums;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IStatisticService
    {
        Task<IEnumerable<RevenueOverTimeDTO>> GetRevenueOverTimeAsync(DateTime startDate, DateTime endDate);
        Task<IEnumerable<SalesByProductDTO>> GetSalesByProductAsync(DateTime startDate, DateTime endDate);
        Task<IEnumerable<MonthlyAnalyticsDTO>> GetMonthlyAnalyticsAsync(DateTime startDate, DateTime endDate);
        Task<IEnumerable<TopProductDTO>> GetTopProductsAsync(DateTime startDate, DateTime endDate, int top = 5);
        Task<IEnumerable<CustomerSegmentDTO>> GetCustomerSegmentsAsync(DateTime startDate, DateTime endDate);
        Task<AnalyticsDashboardDTO> GetAnalyticsDashboardAsync(DateTime startDate, DateTime endDate);
    }
    public class StatisticService(IUnitOfWork unitOfWork) : IStatisticService
    {
        public async Task<IEnumerable<RevenueOverTimeDTO>> GetRevenueOverTimeAsync(DateTime startDate, DateTime endDate)
        {
            var orders = await unitOfWork.Repository<Order>()
                .GetListByCondition(o => o.OrderDate >= startDate && o.OrderDate <= endDate && o.Status == OrderStatusEnum.Completed);

            var revenue = orders
                .GroupBy(o => o.OrderDate.Date)
                .Select(g => new RevenueOverTimeDTO
                {
                    Date = g.Key,
                    TotalRevenue = g.Sum(o => o.TotalAmount)
                })
                .OrderBy(r => r.Date);

            return revenue;
        }

        public async Task<IEnumerable<SalesByProductDTO>> GetSalesByProductAsync(DateTime startDate, DateTime endDate)
        {
            var orderDetails = await unitOfWork.Repository<OrderDetail>()
                .GetListByCondition(od => od.Order != null && od.Order.OrderDate >= startDate && od.Order.OrderDate <= endDate && od.Order.Status == OrderStatusEnum.Completed, new[] { "Product", "Order" });

            var salesByProduct = orderDetails
                .GroupBy(od => od.ProductId)
                .Select(g => new SalesByProductDTO
                {
                    ProductId = g.Key,
                    ProductName = g.First().Product?.Name ?? "N/A",
                    TotalQuantitySold = g.Sum(od => od.Quantity),
                    TotalRevenue = g.Sum(od => od.UnitPrice * od.Quantity)
                });

            return salesByProduct;
        }

        public async Task<IEnumerable<MonthlyAnalyticsDTO>> GetMonthlyAnalyticsAsync(DateTime startDate, DateTime endDate)
        {
            var orders = await unitOfWork.Repository<Order>()
                .GetListByCondition(o => o.OrderDate >= startDate && o.OrderDate <= endDate);

            var monthly = orders
                .GroupBy(o => new { o.OrderDate.Year, o.OrderDate.Month })
                .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Month)
                .Select(g => new MonthlyAnalyticsDTO
                {
                    Month = $"T{g.Key.Month}",
                    Revenue = g.Where(o => o.Status == OrderStatusEnum.Completed).Sum(o => o.TotalAmount),
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

        public async Task<IEnumerable<CustomerSegmentDTO>> GetCustomerSegmentsAsync(DateTime startDate, DateTime endDate)
        {
            var orders = await unitOfWork.Repository<Order>()
                .GetListByCondition(o => o.OrderDate >= startDate && o.OrderDate <= endDate && o.UserId != null);

            var byCustomer = orders
                .GroupBy(o => o.UserId!.Value)
                .Select(g => new { CustomerId = g.Key, Orders = g.Count() })
                .ToList();

            int totalCustomers = byCustomer.Count;
            if (totalCustomers == 0)
            {
                return new List<CustomerSegmentDTO>();
            }

            int newcomers = byCustomer.Count(c => c.Orders == 1);
            int regulars = byCustomer.Count(c => c.Orders >= 2 && c.Orders <= 4);
            int vips = byCustomer.Count(c => c.Orders >= 5);

            var segments = new List<CustomerSegmentDTO>
            {
                new() { Name = "Khách hàng mới", Value = (int)System.Math.Round(newcomers * 100.0 / totalCustomers), Color = "#87C1D8" },
                new() { Name = "Khách hàng thường", Value = (int)System.Math.Round(regulars * 100.0 / totalCustomers), Color = "#5A3E2B" },
                new() { Name = "Khách hàng VIP", Value = (int)System.Math.Round(vips * 100.0 / totalCustomers), Color = "#A5C6A1" }
            };

            return segments;
        }

        public async Task<AnalyticsDashboardDTO> GetAnalyticsDashboardAsync(DateTime startDate, DateTime endDate)
        {
            var monthly = await GetMonthlyAnalyticsAsync(startDate, endDate);
            var topProducts = await GetTopProductsAsync(startDate, endDate, 5);
            var segments = await GetCustomerSegmentsAsync(startDate, endDate);

            return new AnalyticsDashboardDTO
            {
                MonthlyData = monthly,
                TopProducts = topProducts,
                CustomerSegments = segments
            };
        }
    }
}
