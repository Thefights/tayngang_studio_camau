using DataAccessLayer.Models;

namespace BusinessLogicLayer.DTO
{
    public class GetCartItemDTO
    {
        public int Quantity { get; set; }

        public double UnitPrice { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}