using DataAccessLayer.Models.AbstractEntities;
using DataAccessLayer.Models.OrderEntities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models.ProductEntities
{
    public class Product : ImageEntity
    {
        public ICollection<OrderDetail> OrderDetails { get; set; } = [];

        [Column(TypeName = "VARCHAR")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public double Price { get; set; }

        [Column(TypeName = "VARCHAR")]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        public int ProductCategoryId { get; set; }

        public ProductCategory? ProductCategory { get; set; }
    }
}