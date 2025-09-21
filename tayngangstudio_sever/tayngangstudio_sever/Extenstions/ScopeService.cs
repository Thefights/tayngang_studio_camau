using BusinessLogicLayer.Implements.Services;
using BusinessLogicLayer.Implements.Services.ManagementService;
using BusinessLogicLayer.Utils;
using DataAccessLayer.Repository.Base;

namespace tayngangstudio_sever.Extenstions
{
    public static class ScopeServiceExtensions
    {
        public static IServiceCollection AddScopeService(this IServiceCollection _services)
        {
            _services.AddScoped<IUnitOfWork, UnitOfWork>();

            _services.AddScoped<IImageUploadService, ImageUploadService>();
            _services.AddScoped<IProductManagementService, ProductManagementService>();
            _services.AddScoped<IUserService, UserService>();
            _services.AddScoped<IOrderManagementService, OrderManagementService>();
            _services.AddScoped<IProductCategoryManagementService, ProductCategoryManagementService>();
            _services.AddScoped<IProductService, ProductService>();
            _services.AddScoped<IAuthService, AuthService>();
            _services.AddScoped<IEmailService, EmailService>();
            _services.AddScoped<ICustomerService, CustomerService>();
            _services.AddScoped<IStatisticService, StatisticService>();


            _services.AddScoped<JwtUtils>();
            _services.AddScoped<CryptoUtil>();

            return _services;
        }
    }
}