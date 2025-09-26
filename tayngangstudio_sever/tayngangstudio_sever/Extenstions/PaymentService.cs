using BusinessLogicLayer.Helpers;
using Net.payOS;

namespace tayngangstudio_sever.Extenstions
{
    public static class PaymentService
    {
        public static IServiceCollection AddPaymentService(this IServiceCollection services, AppConfiguration configuration)
        {
            PayOS payOS = new PayOS(
                configuration.PayOsConfig.ClientId ?? throw new Exception("Cannot find environment"),
                configuration.PayOsConfig.ApiKey ?? throw new Exception("Cannot find environment"),
                configuration.PayOsConfig.ChecksumKey ?? throw new Exception("Cannot find environment")
            );

            services.AddSingleton(payOS);
            return services;
        }
    }
}