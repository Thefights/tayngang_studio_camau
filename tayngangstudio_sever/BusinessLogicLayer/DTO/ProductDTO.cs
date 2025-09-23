using BusinessLogicLayer.DTO.Abstract;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO
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
        public double Rating { get; set; }

        [Required]
        public int Review { get; set; }

        [Required]
        public int ProductCategoryId { get; set; }
    }

    public class ProductGetDTO : GetImageDTO
    {
        public string Name { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public double Price { get; set; }

        public string Description { get; set; } = string.Empty;

        public double Rating { get; set; }

        public int Review { get; set; }

        public string ProductCategoryName { get; set; } = string.Empty;
    }

    public class ProductUpdateDTO : UpdateImageDTO
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