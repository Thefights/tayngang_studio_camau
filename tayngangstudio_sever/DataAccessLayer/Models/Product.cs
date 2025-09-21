using DataAccessLayer.Models.AbstractEntities;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class Product : ImageEntity
    {
        public ICollection<OrderDetail> OrderDetails { get; set; } = [];

        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public double Price { get; set; }

        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        public double Rating { get; set; }

        public int Review { get; set; }

        public int ProductCategoryId { get; set; }

        public ProductCategory? ProductCategory { get; set; }
    }
}