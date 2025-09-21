using DataAccessLayer.Data.Seeds;
using DataAccessLayer.Models.OrderEntities;
using DataAccessLayer.Models.ProductEntities;
using DataAccessLayer.Models.UserEntities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data
{
    public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure composite keys and relationships for OrderDetail
            modelBuilder.Entity<OrderDetail>()
                .HasKey(od => new { od.OrderId, od.ProductId });

            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.OrderId);

            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Product)
                .WithMany(p => p.OrderDetails)
                .HasForeignKey(od => od.ProductId);

            // Seed initial data
            OrderDataSeeds.Seed(modelBuilder);
            OrderDetailDataSeeds.Seed(modelBuilder);
            ProductCategoryDataSeeds.Seed(modelBuilder);
            ProductDataSeeds.Seed(modelBuilder);
            UserDataSeeds.Seed(modelBuilder);
        }
    }
}