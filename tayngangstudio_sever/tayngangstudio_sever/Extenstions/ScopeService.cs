using BusinessLogicLayer.Implements.Services;
using BusinessLogicLayer.Utils;
using DataAccessLayer.Repository.Base;
using static BusinessLogicLayer.Implements.Services.UserService;

namespace tayngangstudio_sever.Extenstions
{
    public static class ScopeServiceExtensions
    {
        public static IServiceCollection AddScopeService(this IServiceCollection _services)
        {
            _services.AddScoped<IUnitOfWork, UnitOfWork>();

            _services.AddScoped<IImageService, ImageService>();
            _services.AddScoped<IProductService, ProductService>();
            _services.AddScoped<IUserService, UserService>();
            _services.AddScoped<IOrderService, OrderService>();
            //_services.AddScoped<IAuthService, AuthService>();

            _services.AddScoped<JwtUtils>();
            _services.AddScoped<CryptoUtil>();

            return _services;
        }
    }
}