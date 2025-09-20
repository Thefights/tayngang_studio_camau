using DataAccessLayer.Models.AbstractEntities;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models.ProductEntities
{
    public class ProductCategory : BaseEntity
    {
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        public ICollection<Product> Products { get; set; } = [];
    }
}