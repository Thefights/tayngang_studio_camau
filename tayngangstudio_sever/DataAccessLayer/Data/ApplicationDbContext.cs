using DataAccessLayer.Data.Seeds;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data
{
    public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
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

            // Configure composite keys and relationships for CartItem
            modelBuilder.Entity<CartItem>()
                .HasKey(od => new { od.CartId, od.ProductId });

            modelBuilder.Entity<CartItem>()
                .HasOne(od => od.Cart)
                .WithMany(o => o.CartItems)
                .HasForeignKey(od => od.CartId);

            modelBuilder.Entity<CartItem>()
                .HasOne(od => od.Product)
                .WithMany(p => p.CartItems)
                .HasForeignKey(od => od.ProductId);


            // Seed initial data
            OrderDataSeeds.Seed(modelBuilder);
            OrderDetailDataSeeds.Seed(modelBuilder);
            ProductCategoryDataSeeds.Seed(modelBuilder);
            ProductDataSeeds.Seed(modelBuilder);
            UserDataSeeds.Seed(modelBuilder);
            CartDataSeeds.Seed(modelBuilder);
            CartItemDataSeeds.Seed(modelBuilder);
        }
    }
}