using DataAccessLayer.Models.ProductEntities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class ProductCategoryDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductCategory>().HasData(
                new ProductCategory { Id = 1, Name = "Điện thoại", Description = "Các loại smartphone" },
                new ProductCategory { Id = 2, Name = "Laptop", Description = "Máy tính xách tay" },
                new ProductCategory { Id = 3, Name = "Tablet", Description = "Máy tính bảng" }
            );
        }
    }
}
