using DataAccessLayer.Enums;
using DataAccessLayer.Models.AbstractEntities;

namespace DataAccessLayer.Models
{
    public class Order : BaseEntity
    {
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public double TotalAmount { get; set; }

        public OrderStatusEnum Status { get; set; } = OrderStatusEnum.Pending;

        public PaymentMethodEnum PaymentMethod { get; set; }

        public int? UserId { get; set; }

        public User User { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; } = [];
    }
}