using Amazon.S3;

namespace tayngangstudio_sever.Extenstions
{
    public static class AWSServiceExtension
    {
        public static IServiceCollection AddAWSService(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDefaultAWSOptions(configuration.GetAWSOptions());
            services.AddAWSService<IAmazonS3>();

            return services;
        }
    }
}