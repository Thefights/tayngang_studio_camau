using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class CartItemDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CartItem>().HasData(
                new CartItem
                {
                    CartId = 1,
                    ProductId = 1,
                    Quantity = 2,
                    UnitPrice = 25_000_000 // iPhone 14
                },
                new CartItem
                {
                    CartId = 1,
                    ProductId = 3,
                    Quantity = 1,
                    UnitPrice = 45_000_000 // Macbook Pro
                },
                new CartItem
                {
                    CartId = 2,
                    ProductId = 2,
                    Quantity = 1,
                    UnitPrice = 20_000_000 // Samsung S23
                }
            );
        }
    }
}
