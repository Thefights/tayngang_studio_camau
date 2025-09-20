using DataAccessLayer.Models.ProductEntities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class ProductDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Pork Intestine Porridge", Quantity = 100, Price = 2.5, Description = "Traditional rice porridge with pork intestines", ProductCategoryId = 1, ImageUrl = "/images/porridge1.png" },
                new Product { Id = 2, Name = "Chicken Porridge", Quantity = 100, Price = 2.0, Description = "Rice porridge with shredded chicken", ProductCategoryId = 1, ImageUrl = "/images/porridge2.png" },
                new Product { Id = 3, Name = "Century Egg Porridge", Quantity = 80, Price = 2.8, Description = "Rice porridge with century egg and minced pork", ProductCategoryId = 1, ImageUrl = "/images/porridge3.png" },


                new Product { Id = 6, Name = "Iced Tea", Quantity = 100, Price = 0.2, Description = "Refreshing iced tea", ProductCategoryId = 3, ImageUrl = "/images/drink1.png" },
                new Product { Id = 7, Name = "Soy Milk", Quantity = 100, Price = 0.4, Description = "Homemade soy milk", ProductCategoryId = 3, ImageUrl = "/images/drink2.png" }
            );

        }
    }
}