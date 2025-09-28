using DataAccessLayer.Enums;
using DataAccessLayer.Models.AbstractEntities;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class User : BaseEntity
    {
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        public UserRoleEnum Role { get; set; } = UserRoleEnum.Customer;

        public ICollection<Order> Orders { get; set; } = [];
    }
}