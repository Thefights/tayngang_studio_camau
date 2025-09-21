using DataAccessLayer.Enums;
using DataAccessLayer.Models.UserEntities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class UserDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
    new User { Id = 1, Name = "Admin", Email = "admin@example.com", Phone = "0123456789", Password = "123456", Role = UserRoleEnum.Admin, CreateAt = new DateTime(2025, 1, 1), UpdateAt = new DateTime(2025, 1, 1) },
    new User { Id = 2, Name = "Alice", Email = "alice@example.com", Phone = "0987654321", Password = "123456", Role = UserRoleEnum.Customer, CreateAt = new DateTime(2025, 1, 1), UpdateAt = new DateTime(2025, 1, 1) },
    new User { Id = 3, Name = "Bob", Email = "bob@example.com", Phone = "0911222333", Password = "123456", Role = UserRoleEnum.Customer, CreateAt = new DateTime(2025, 1, 1), UpdateAt = new DateTime(2025, 1, 1) }
);

        }
    }
}
