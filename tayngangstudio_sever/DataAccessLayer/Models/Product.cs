using DataAccessLayer.Models.AbstractEntities;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class Product : ImageEntity
    {
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public double Price { get; set; }

        public string? Description { get; set; } = string.Empty;

        public double Rating { get; set; }

        public int Review { get; set; }

        public int ProductCategoryId { get; set; }

        public ProductCategory? ProductCategory { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; } = [];
        public ICollection<CartItem> CartItems { get; set; } = [];

    }
}