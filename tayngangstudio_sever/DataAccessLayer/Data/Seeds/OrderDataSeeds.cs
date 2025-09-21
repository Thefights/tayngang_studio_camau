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
    new Order { Id = 1, OrderDate = new DateTime(2025, 1, 5), TotalAmount = 50000000, Status = OrderStatusEnum.Completed, UserId = 2 },
    new Order { Id = 2, OrderDate = new DateTime(2025, 1, 10), TotalAmount = 20000000, Status = OrderStatusEnum.Pending, UserId = 3 }
);

        }
    }
}
