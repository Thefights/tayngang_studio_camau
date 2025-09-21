namespace BusinessLogicLayer.Helpers
{
    public class AppConfiguration
    {
        public AppSettings AppSettings { get; set; } = null!;
        public ConnectionStrings ConnectionStrings { get; set; } = null!;
        public R2Config R2Config { get; set; } = null!;
        public SmtpSettings SmtpSettings { get; set; } = null!;
    }

    public class AppSettings
    {
        public string SecretKey { get; set; } = string.Empty;
    }

    public class ConnectionStrings
    {
        public string TayNgangDb { get; set; } = string.Empty;
    }

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

    public class SmtpSettings
    {
        public string Server { get; set; } = string.Empty;
        public int Port { get; set; }
        public string FromAddress { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public bool EnableSsl { get; set; }
    }
}

