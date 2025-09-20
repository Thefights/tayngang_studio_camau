using DataAccessLayer.Enums;
using DataAccessLayer.Models.UserEntities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class VoucherDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Voucher>().HasData(
                new Voucher { Id = 1, Name = "10% Off Breakfast", Quantity = 50, Description = "10% discount for all porridge before 10 AM", Code = "BREAKFAST10", DiscountAmount = 0.1, ExpiryDate = new DateTime(2025, 08, 10, 0, 0, 0, DateTimeKind.Local), Status = VoucherStatusEnum.Active },
                new Voucher { Id = 2, Name = "Buy 2 Get 1 Free", Quantity = 30, Description = "Order 2 porridge, get 1 free drink", Code = "PORRIDGE21", DiscountAmount = 0.4, ExpiryDate = new DateTime(2025, 08, 10, 0, 0, 0, DateTimeKind.Local), Status = VoucherStatusEnum.Active }
            );
        }
    }
}