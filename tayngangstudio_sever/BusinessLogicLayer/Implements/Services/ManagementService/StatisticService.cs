using BusinessLogicLayer.DTO.StatisticDTOs;
using DataAccessLayer.Models;
using DataAccessLayer.Repository.Base;

namespace BusinessLogicLayer.Implements.Services.ManagementService
{
    public interface IStatisticService
    {
        Task<IEnumerable<RevenueOverTimeDTO>> GetRevenueOverTimeAsync(DateTime startDate, DateTime endDate);
        Task<IEnumerable<SalesByProductDTO>> GetSalesByProductAsync(DateTime startDate, DateTime endDate);
    }
    public class StatisticService(IUnitOfWork unitOfWork) : IStatisticService
    {
        public async Task<IEnumerable<RevenueOverTimeDTO>> GetRevenueOverTimeAsync(DateTime startDate, DateTime endDate)
        {
            var orders = await unitOfWork.Repository<Order>()
                .GetListByCondition(o => o.OrderDate >= startDate && o.OrderDate <= endDate);

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
                .GetListByCondition(od => od.Order.OrderDate >= startDate && od.Order.OrderDate <= endDate, new[] { "Product", "Order" });

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
    }
}
