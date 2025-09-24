namespace BusinessLogicLayer.DTO
{
    public class UploadResultDto
    {
        public string FileName { get; set; } = string.Empty;
        public string PublicUrl { get; set; } = string.Empty;
        public long FileSizeBytes { get; set; }
    }
}