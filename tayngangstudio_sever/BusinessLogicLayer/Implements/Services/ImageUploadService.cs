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
        Task<MultipleUploadResultDto> UploadImagesAsync(IFormFileCollection files, string? folder = null);
        Task DeleteImageAsync(string fileName);
        Task DeleteImagesAsync(IEnumerable<string> fileNames);
    }

    public class ImageUploadService(IAmazonS3 _s3Client, R2Config _r2Config) : IImageUploadService
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
                PublicUrl = $"{_r2Config.PublicBaseUrl}/{fileName}",
                FileSizeBytes = fileSizeBytes
            };
        }

        public async Task<MultipleUploadResultDto> UploadImagesAsync(IFormFileCollection files, string? folder = null)
        {
            var results = new List<UploadResultDto>();
            var failedFiles = new List<string>();

            foreach (var file in files)
            {
                var validationResult = ImageUploadUtils.ValidateFile(file);
                if (!validationResult.IsValid)
                {
                    failedFiles.Add($"{file.FileName}: {validationResult.ErrorMessage}");
                    continue;
                }

                var fileName = ImageUploadUtils.GenerateFileName(file.FileName, folder);

                try
                {
                    using var webpStream = await ImageUploadUtils.ConvertToWebPAsync(file);
                    var fileSizeBytes = webpStream.Length;
                    await UploadToR2Async(fileName, webpStream);

                    results.Add(new UploadResultDto
                    {
                        FileName = fileName,
                        PublicUrl = $"{_r2Config.PublicBaseUrl}/{fileName}",
                        FileSizeBytes = fileSizeBytes
                    });
                }
                catch (Exception ex)
                {
                    failedFiles.Add($"{file.FileName}: Upload failed - {ex.Message}");
                }
            }

            return new MultipleUploadResultDto
            {
                SuccessfulUploads = results,
                FailedFiles = failedFiles,
                SuccessCount = results.Count,
                FailureCount = failedFiles.Count
            };
        }

        public async Task DeleteImageAsync(string fileName)
        {
            try
            {
                await DeleteFromR2Async(fileName);
            }
            catch (Exception ex)
            {
                throw new Exception($"Image deletion failed: {ex.Message}");
            }
        }

        public async Task DeleteImagesAsync(IEnumerable<string> fileNames)
        {
            var failedDeletions = new List<string>();
            foreach (var fileName in fileNames)
            {
                try
                {
                    await DeleteFromR2Async(fileName);
                }
                catch
                {
                    failedDeletions.Add(fileName);
                }
            }

            if (failedDeletions.Any())
            {
                throw new Exception($"Failed to delete {failedDeletions.Count} images.");
            }
        }

        private async Task<PutObjectResponse> UploadToR2Async(string fileName, Stream fileStream)
        {
            var request = new PutObjectRequest
            {
                BucketName = _r2Config.Bucket,
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

        private async Task<DeleteObjectResponse> DeleteFromR2Async(string fileName)
        {
            var request = new DeleteObjectRequest
            {
                BucketName = _r2Config.Bucket,
                Key = fileName
            };
            return await _s3Client.DeleteObjectAsync(request);
        }
    }
}