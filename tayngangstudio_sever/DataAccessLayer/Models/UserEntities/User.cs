using DataAccessLayer.Enums;
using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Models.OrderEntities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models.UserEntities
{
    public class User : BaseEntity
    {
        [Column(TypeName = "VARCHAR")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Column(TypeName = "VARCHAR")]
        [MaxLength(15)]
        public string Phone { get; set; } = string.Empty;

        [Column(TypeName = "VARCHAR")]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        public UserRoleEnum Role { get; set; }

        [Column(TypeName = "VARCHAR")]
        [MaxLength(100)]
        public string Password { get; set; } = string.Empty;

        [Column(TypeName = "VARCHAR")]
        [MaxLength(100)]
        public string? RefreshToken { get; set; }

        public DateTime? RefreshTokenExpiryTime { get; set; }

        public ICollection<UserVoucher> UserVouchers { get; set; } = [];
        public ICollection<Order> Orders { get; set; } = [];
    }
}