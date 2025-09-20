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

        public ICollection<OrderDetail> OrderDetails { get; set; } = [];
    }
}