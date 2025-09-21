using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class OrderDetailDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderDetail>().HasData(
                new OrderDetail { OrderId = 1, ProductId = 1, Quantity = 2, UnitPrice = 25000000, Total = 50000000 },
                new OrderDetail { OrderId = 2, ProductId = 2, Quantity = 1, UnitPrice = 20000000, Total = 20000000 }
            );
        }
    }
}
