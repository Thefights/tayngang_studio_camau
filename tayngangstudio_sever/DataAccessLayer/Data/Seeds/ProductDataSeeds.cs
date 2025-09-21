using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class ProductDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "iPhone 14",
                    Quantity = 50,
                    Price = 25000000,
                    Description = "Điện thoại Apple",
                    Rating = 4.5,
                    Review = 120,
                    ProductCategoryId = 1,
                    ImageUrl = "iphone14.jpg"
                },
                new Product
                {
                    Id = 2,
                    Name = "Samsung S23",
                    Quantity = 40,
                    Price = 20000000,
                    Description = "Điện thoại Samsung",
                    Rating = 4.2,
                    Review = 95,
                    ProductCategoryId = 2,
                    ImageUrl = "s23.jpg"
                },
                new Product
                {
                    Id = 3,
                    Name = "Macbook Pro",
                    Quantity = 20,
                    Price = 45000000,
                    Description = "Laptop Apple",
                    Rating = 4.8,
                    Review = 210,
                    ProductCategoryId = 3,
                    ImageUrl = "macbook.jpg"
                }
            );
        }
    }
}