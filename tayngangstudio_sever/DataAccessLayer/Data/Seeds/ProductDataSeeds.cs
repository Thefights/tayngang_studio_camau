using DataAccessLayer.Models.ProductEntities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class ProductDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "iPhone 14", Quantity = 50, Price = 25000000, Description = "Điện thoại Apple", Rating = 4.5, ProductCategoryId = 1, ImageUrl = "iphone14.jpg" },
                new Product { Id = 2, Name = "Samsung S23", Quantity = 40, Price = 20000000, Description = "Điện thoại Samsung", Rating = 4.2, ProductCategoryId = 1, ImageUrl = "s23.jpg" },
                new Product { Id = 3, Name = "Macbook Pro", Quantity = 20, Price = 45000000, Description = "Laptop Apple", Rating = 4.8, ProductCategoryId = 2, ImageUrl = "macbook.jpg" }
            );
        }
    }
}
