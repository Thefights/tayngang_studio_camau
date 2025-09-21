using Amazon.S3;
using Amazon.S3.Model;
using BusinessLogicLayer.DTO;
using BusinessLogicLayer.Helpers;
using BusinessLogicLayer.Utils;
using Microsoft.AspNetCore.Http;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IImageUploadService
    {
        Task<UploadResultDto> UploadImageAsync(IFormFile file, string? folder = null);
    }

    public class ImageUploadService(IAmazonS3 _s3Client, AppConfiguration configuration) : IImageUploadService
    {
        public async Task<UploadResultDto> UploadImageAsync(IFormFile file, string? folder = null)
        {
            var validationResult = ImageUploadUtils.ValidateFile(file);
            if (!validationResult.IsValid)
            {
                throw new Exception(validationResult.ErrorMessage);
            }

            var fileName = ImageUploadUtils.GenerateFileName(file.FileName, folder);

            using var webpStream = await ImageUploadUtils.ConvertToWebPAsync(file);
            var fileSizeBytes = webpStream.Length;
            await UploadToR2Async(fileName, webpStream);

            return new UploadResultDto
            {
                FileName = fileName,
                PublicUrl = $"{configuration.R2Config.PublicBaseUrl}/{fileName}",
                FileSizeBytes = fileSizeBytes
            };
        }

        private async Task<PutObjectResponse> UploadToR2Async(string fileName, Stream fileStream)
        {
            var request = new PutObjectRequest
            {
                BucketName = configuration.R2Config.Bucket,
                Key = fileName,
                InputStream = fileStream,
                ContentType = "image/webp",
                CannedACL = S3CannedACL.PublicRead,
                UseChunkEncoding = false,
                AutoResetStreamPosition = true,
                AutoCloseStream = false,
            };
            return await _s3Client.PutObjectAsync(request);
        }
    }
}