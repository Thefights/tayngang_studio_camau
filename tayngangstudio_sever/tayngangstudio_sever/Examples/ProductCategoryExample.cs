using DataAccessLayer.Models.ProductEntities;
using Swashbuckle.AspNetCore.Filters;

namespace tayngangstudio_sever.Examples
{
    internal class ProductCategoryExample : IExamplesProvider<ProductCategory>
    {
        public ProductCategory GetExamples()
        {
            return new ProductCategory
            {
                Id = 1,
                Name = "Do An",
                Description = "Do An real",
            };
        }
    }
}