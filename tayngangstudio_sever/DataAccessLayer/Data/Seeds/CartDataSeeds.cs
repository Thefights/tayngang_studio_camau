using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class CartDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cart>().HasData(
                new Cart
                {
                    Id = 1,
                    UserId = 2
                },
                new Cart
                {
                    Id = 2,
                    UserId = 3
                }
            );
        }
    }
}
