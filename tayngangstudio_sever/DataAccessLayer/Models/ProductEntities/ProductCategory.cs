using DataAccessLayer.Models.AbstractEntities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models.ProductEntities
{
    public class ProductCategory : BaseEntity
    {
        [Column(TypeName = "VARCHAR")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Column(TypeName = "VARCHAR")]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        public ICollection<Product> Products { get; set; } = [];
    }
}