using Swashbuckle.AspNetCore.Filters;
using tayngangstudio_sever.Examples;

namespace tayngangstudio_sever.Extenstions
{
    public static class ExampleServiceExtensions
    {
        public static IServiceCollection AddExampleService(this IServiceCollection _service, IConfiguration _configuration)
        {
            _service.AddSwaggerExamplesFromAssemblyOf<ProductExample>();
            _service.AddSwaggerExamplesFromAssemblyOf<OrderDetailExample>();
            _service.AddSwaggerExamplesFromAssemblyOf<OrderExample>();
            _service.AddSwaggerExamplesFromAssemblyOf<ProductCategoryExample>();
            _service.AddSwaggerExamplesFromAssemblyOf<UserExample>();
            _service.AddSwaggerExamplesFromAssemblyOf<VoucherExample>();

            return _service;
        }
    }
}