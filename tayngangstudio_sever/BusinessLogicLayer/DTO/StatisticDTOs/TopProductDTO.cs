namespace BusinessLogicLayer.DTO.StatisticDTOs
{
    public class TopProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Sales { get; set; }
        public double Revenue { get; set; }
    }
}
