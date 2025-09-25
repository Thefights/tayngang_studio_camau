using DataAccessLayer.Enums;
using DataAccessLayer.Models.AbstractEntities;

namespace DataAccessLayer.Models
{
    public class Order : BaseEntity
    {
        public DateTime OrderDate { get; set; }

        public double TotalAmount { get; set; }

        public OrderStatusEnum Status { get; set; } = OrderStatusEnum.Pending;

        public int? UserId { get; set; }

        public User User { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; } = [];
    }
}