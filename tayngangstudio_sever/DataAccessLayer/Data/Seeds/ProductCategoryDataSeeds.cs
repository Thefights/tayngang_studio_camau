using DataAccessLayer.Models.ProductEntities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class ProductCategoryDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductCategory>().HasData(
                new ProductCategory { Id = 1, Name = "Sổ Tay Xứ Mũi", Description = "Các loại smartphone" },
                new ProductCategory { Id = 2, Name = "Móc khoá", Description = "Máy tính xách tay" },
                new ProductCategory { Id = 3, Name = "Sản phẩm combo", Description = "Máy tính bảng" }
            );
        }
    }
}
