namespace BusinessLogicLayer.DTO
{
    public class OrderDetailGetDTO
    {
        public int Quantity { get; set; }

        public double UnitPrice { get; set; }

        public double Total { get; set; } = 0;

        public int ProductId { get; set; }
    }
}