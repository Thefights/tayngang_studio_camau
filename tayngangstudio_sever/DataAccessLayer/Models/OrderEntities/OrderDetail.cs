using DataAccessLayer.Models.ProductEntities;

namespace DataAccessLayer.Models.OrderEntities
{
    public class OrderDetail
    {
        public int Quantity { get; set; }

        public double UnitPrice { get; set; }

        public double Total { get; set; } = 0;

        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}