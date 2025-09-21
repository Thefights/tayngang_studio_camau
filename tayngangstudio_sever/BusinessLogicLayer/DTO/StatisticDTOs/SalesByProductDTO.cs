namespace BusinessLogicLayer.DTO.StatisticDTOs
{
    public class SalesByProductDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int TotalQuantitySold { get; set; }
        public double TotalRevenue { get; set; }
    }
}
