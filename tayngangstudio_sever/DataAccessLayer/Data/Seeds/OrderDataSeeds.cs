using DataAccessLayer.Enums;
using DataAccessLayer.Models.OrderEntities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class OrderDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>().HasData(
                new Order { Id = 1, OrderDate = new DateTime(2025, 08, 10, 0, 0, 0, DateTimeKind.Local), TotalAmount = 5.0, Status = OrderStatusEnum.Processing, UserId = 2, VoucherId = 1 },
                new Order { Id = 2, OrderDate = new DateTime(2025, 08, 10, 0, 0, 0, DateTimeKind.Local), TotalAmount = 2.3, Status = OrderStatusEnum.Pending, UserId = 3, VoucherId = null }
            );
        }
    }
}