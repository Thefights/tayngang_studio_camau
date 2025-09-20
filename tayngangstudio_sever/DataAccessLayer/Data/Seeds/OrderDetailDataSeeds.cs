using DataAccessLayer.Models.OrderEntities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class OrderDetailDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderDetail>().HasData(
                new { OrderId = 1, ProductId = 1, Quantity = 2, UnitPrice = 2.5, Total = 5.0 },
                new { OrderId = 1, ProductId = 3, Quantity = 1, UnitPrice = 0.5, Total = 0.5 }
            );
        }
    }
}