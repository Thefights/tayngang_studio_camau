using DataAccessLayer.Enums;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data.Seeds
{
    public static class UserDataSeeds
    {
        public static void Seed(ModelBuilder modelBuilder)
        {//Password is "password" hashed with bcrypt
            modelBuilder.Entity<User>().HasData(
    new User { Id = 1, Name = "Admin", Email = "admin@example.com", Phone = "0123456789", Password = "$2y$07$YNEeH48yISxBEAT/m4DQ/uLVRAjUEiOOwojFJoPyS8QT4Hr2skGRa", Role = UserRoleEnum.Admin },
    new User { Id = 2, Name = "Alice", Email = "alice@example.com", Phone = "0987654321", Password = "$2y$07$YNEeH48yISxBEAT/m4DQ/uLVRAjUEiOOwojFJoPyS8QT4Hr2skGRa", Role = UserRoleEnum.Customer },
    new User { Id = 3, Name = "Bob", Email = "bob@example.com", Phone = "0911222333", Password = "$2y$07$YNEeH48yISxBEAT/m4DQ/uLVRAjUEiOOwojFJoPyS8QT4Hr2skGRa", Role = UserRoleEnum.Customer }
);

        }
    }
}
