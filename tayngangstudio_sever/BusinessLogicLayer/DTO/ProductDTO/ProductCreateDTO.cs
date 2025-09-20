using BusinessLogicLayer.DTO.Abstract.ImageDTO;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO.ProductDTO
{
    public class ProductCreateDTO : CreateImageDTO
    {
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "{0} must be between {2} and {1} characters long.")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "{0} cannot be negative.")]
        public int Quantity { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "{0} must be at least {1}.")]
        public double Price { get; set; }

        [StringLength(1000, ErrorMessage = "{0} cannot exceed {1} characters.")]
        public string Description { get; set; } = string.Empty;

        [Required]
        public int ProductCategoryId { get; set; }
    }
}