using Amazon.S3;
using BusinessLogicLayer.Helpers;

namespace tayngangstudio_sever.Extenstions
{
    public static class AWSServiceExtension
    {
        public static IServiceCollection AddAWSService(this IServiceCollection services, IConfiguration configuration)
        {
            var r2Config = new R2Config();
            configuration.GetSection("R2Config").Bind(r2Config);
            services.AddSingleton(r2Config);

            services.AddSingleton<IAmazonS3>(provider =>
            {
                var config = new AmazonS3Config
                {
                    ServiceURL = r2Config.ServiceUrl,
                    ForcePathStyle = true,
                    UseHttp = false,
                    AuthenticationRegion = "auto",
                    SignatureMethod = Amazon.Runtime.SigningAlgorithm.HmacSHA256,
                };

                return new AmazonS3Client(r2Config.AccessKeyId, r2Config.SecretAccessKey, config);
            });

            return services;
        }
    }
}