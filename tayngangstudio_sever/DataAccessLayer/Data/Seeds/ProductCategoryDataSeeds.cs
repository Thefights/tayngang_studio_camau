using DataAccessLayer.Models.ProductEntities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class ProductCategoryDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductCategory>().HasData(
                    new ProductCategory { Id = 1, Name = "Porridge", Description = "Vietnamese rice porridge dishes" },
                    new ProductCategory { Id = 3, Name = "Drink", Description = "Beverages" }
            );
        }
    }
}