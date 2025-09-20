using DataAccessLayer.Enums;
using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Models.OrderEntities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models.UserEntities
{
    public class Voucher : BaseEntity
    {
        [Column(TypeName = "VARCHAR")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public int Quantity { get; set; }

        [Column(TypeName = "VARCHAR")]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "VARCHAR")]
        [MaxLength(50)]
        public string Code { get; set; } = string.Empty;

        public double DiscountAmount { get; set; }

        public DateTime ExpiryDate { get; set; }

        public VoucherStatusEnum Status { get; set; }

        public ICollection<Order> Orders { get; set; } = [];
        public ICollection<UserVoucher> UserVouchers { get; set; } = [];
    }
}