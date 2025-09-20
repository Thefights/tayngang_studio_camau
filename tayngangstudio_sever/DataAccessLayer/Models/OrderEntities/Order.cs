using DataAccessLayer.Enums;
using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Models.UserEntities;

namespace DataAccessLayer.Models.OrderEntities
{
    public class Order : BaseEntity
    {
        public DateTime OrderDate { get; set; }

        public double TotalAmount { get; set; }

        public OrderStatusEnum Status { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int? VoucherId { get; set; }
        public Voucher? Voucher { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; } = [];

        //public static double CalculateTotalAmount(ICollection<OrderDetail> orderDetails, string voucherCode)
        //{
        //    double total = 0.0;
        //    foreach (var detail in orderDetails)
        //    {
        //        total += detail.UnitPrice * detail.Quantity;
        //    }
        //    total -= GetVoucherDiscount(voucherCode);
        //    return total < 0 ? 0 : total;
        //}

        //private static double GetVoucherDiscount(string voucherCode)
        //{
        //    // Implement your logic to get the voucher discount based on the voucher code
        //    return 0.0;
        //}
    }
}