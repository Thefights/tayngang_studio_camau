namespace BusinessLogicLayer.DTO.StatisticDTOs
{
    public class MonthlyAnalyticsDTO
    {
        public string Month { get; set; } = string.Empty; // e.g., "T1"
        public double Revenue { get; set; }
        public int Orders { get; set; }
        public int Customers { get; set; }
    }
}
