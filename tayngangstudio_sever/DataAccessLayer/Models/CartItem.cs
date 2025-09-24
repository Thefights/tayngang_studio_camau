namespace DataAccessLayer.Models
{
    public class CartItem
    {
        public int Quantity { get; set; }

        public double UnitPrice { get; set; }

        public int CartId { get; set; }
        public Cart? Cart { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}