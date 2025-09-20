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
                new User { Id = 1, Name = "Admin", Phone = "0123456789", Email = "admin@chaoshop.com", Role = UserRoleEnum.Admin, Password = "hashed_admin" },
                new User { Id = 2, Name = "David Nguyen", Phone = "0987654321", Email = "david@chaoshop.com", Role = UserRoleEnum.Customer, Password = "hashed_david" },
                new User { Id = 3, Name = "Lisa Tran", Phone = "0977777777", Email = "lisa@chaoshop.com", Role = UserRoleEnum.Customer, Password = "hashed_lisa" }
            );
        }
    }
}