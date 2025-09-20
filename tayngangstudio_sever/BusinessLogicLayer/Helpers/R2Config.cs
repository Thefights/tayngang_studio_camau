namespace BusinessLogicLayer.Helpers
{
    public class R2Config
    {
        public string AccountId { get; set; } = string.Empty;
        public string AccessKeyId { get; set; } = string.Empty;
        public string SecretAccessKey { get; set; } = string.Empty;
        public string Bucket { get; set; } = string.Empty;
        public string PublicBaseUrl { get; set; } = string.Empty;
        public string Region { get; set; } = "auto";
        public string ServiceUrl => $"https://{AccountId}.r2.cloudflarestorage.com";
    }
}