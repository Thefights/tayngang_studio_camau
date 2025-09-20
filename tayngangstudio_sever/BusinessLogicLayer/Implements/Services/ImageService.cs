using Amazon.S3;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IImageService
    {
        public Task<string> UploadImageAsync(IFormFile file, string bucketName);
    }
    public class ImageService(IAmazonS3 _s3Client) : IImageService
    {
        public async Task<string> UploadImageAsync(IFormFile _file, string _bucketName)
        {
            if (!await IsFileExtensionValid(_file))
            {
                throw new InvalidOperationException("Invalid file type.");
            }

            var fileTransferUtility = new Amazon.S3.Transfer.TransferUtility(_s3Client);
            var fileExtension = Path.GetExtension(_file.FileName);
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";

            using (var stream = _file.OpenReadStream())
            {
                var uploadRequest = new Amazon.S3.Transfer.TransferUtilityUploadRequest
                {
                    InputStream = stream,
                    Key = uniqueFileName,
                    BucketName = _bucketName,
                    ContentType = _file.ContentType
                };
                await fileTransferUtility.UploadAsync(uploadRequest);
            }

            string fileUrl = $"https://{_bucketName}.s3.amazonaws.com/{uniqueFileName}";

            return fileUrl;
        }

        private async Task<bool> IsFileExtensionValid(IFormFile file)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var fileExtension = Path.GetExtension(file.FileName).ToLower();
            return allowedExtensions.Contains(fileExtension);
        }
    }
}