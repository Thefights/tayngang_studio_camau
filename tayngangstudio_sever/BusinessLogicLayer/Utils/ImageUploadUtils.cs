using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;

namespace BusinessLogicLayer.Utils
{
    public static class ImageUploadUtils
    {
        private const long MaxFileSizeBytes = 30 * 1024 * 1024;
        private static readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp" };

        public static (bool IsValid, string? ErrorMessage) ValidateFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return (false, "File is empty or null");

            if (file.Length > MaxFileSizeBytes)
                return (false, $"File size exceeds {MaxFileSizeBytes / (1024 * 1024)} MB limit");

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!_allowedExtensions.Contains(extension))
                return (false, $"File type {extension} is not supported. Allowed types: {string.Join(", ", _allowedExtensions)}");

            return (true, null);
        }

        public static async Task<MemoryStream> ConvertToWebPAsync(IFormFile file)
        {
            using var inputStream = file.OpenReadStream();
            using var image = await Image.LoadAsync(inputStream);

            var outputStream = new MemoryStream();
            var webpEncoder = new WebpEncoder
            {
                Quality = 80,
                Method = WebpEncodingMethod.Default
            };

            await image.SaveAsWebpAsync(outputStream, webpEncoder);
            outputStream.Position = 0;

            return outputStream;
        }

        public static string GenerateFileName(string originalFileName, string? folder = null)
        {
            var extension = Path.GetExtension(originalFileName);
            var nameWithoutExtension = Path.GetFileNameWithoutExtension(originalFileName);
            var sanitizedName = string.Concat(nameWithoutExtension.Where(c => char.IsLetterOrDigit(c) || c == '-' || c == '_'));

            if (string.IsNullOrEmpty(sanitizedName))
                sanitizedName = "image";

            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            var guid = Guid.NewGuid().ToString("N")[..8];

            var fileName = $"{sanitizedName}_{timestamp}_{guid}.webp";

            if (!string.IsNullOrEmpty(folder))
            {
                return $"{folder.TrimStart('/').TrimEnd('/')}/{fileName}";
            }

            return fileName;
        }
    }
}
