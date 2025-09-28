namespace BusinessLogicLayer.DTO.StatisticDTOs
{
    public class CustomerSegmentDTO
    {
        public string Name { get; set; } = string.Empty;
        public int Value { get; set; } // percentage or count depending on endpoint usage
        public string? Color { get; set; }
    }
}
