namespace BusinessLogicLayer.DTO.StatisticDTOs
{
    public class AnalyticsDashboardDTO
    {
        public IEnumerable<MonthlyAnalyticsDTO> MonthlyData { get; set; } = [];
        public IEnumerable<TopProductDTO> TopProducts { get; set; } = [];
        public IEnumerable<CustomerSegmentDTO> CustomerSegments { get; set; } = [];
    }
}
