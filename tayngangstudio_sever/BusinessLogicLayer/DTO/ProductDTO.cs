using BusinessLogicLayer.DTO.Abstract;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO
{
	public class CreateProductDTO : CreateImageDTO
	{
		[Required(ErrorMessage = "{0} is required")]
		[StringLength(100, MinimumLength = 2, ErrorMessage = "{0} must be between {2} and {1} characters long.")]
		public string Name { get; set; } = string.Empty;

		[Required(ErrorMessage = "{0} is required")]
		[Range(0, int.MaxValue, ErrorMessage = "{0} cannot be negative.")]
		public int Quantity { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		[Range(0, double.MaxValue, ErrorMessage = "{0} cannot be negative.")]
		public double Price { get; set; }

		[StringLength(1000, ErrorMessage = "{0} cannot exceed {1} characters.")]
		public string Description { get; set; } = string.Empty;

		[Required(ErrorMessage = "{0} is required")]
		public double Rating { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		public int Review { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		[Range(1, int.MaxValue, ErrorMessage = "{0} is between {1} and {2}")]
		public int ProductCategoryId { get; set; }
	}


	public class GetProductDTO : GetImageDTO
	{
		public string Name { get; set; } = string.Empty;

		public int Quantity { get; set; }

		public double Price { get; set; }

		public string Description { get; set; } = string.Empty;

		public double Rating { get; set; }

		public int Review { get; set; }

		public string ProductCategoryName { get; set; } = string.Empty;
	}

	public class UpdateProductDTO : UpdateImageDTO
	{
		[Required]
		[StringLength(100, MinimumLength = 2, ErrorMessage = "{0} must be between {2} and {1} characters long.")]
		public string Name { get; set; } = string.Empty;

		[Required(ErrorMessage = "{0} is required")]
		[Range(0, int.MaxValue, ErrorMessage = "{0} cannot be negative.")]
		public int Quantity { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		[Range(0.01, double.MaxValue, ErrorMessage = "{0} must be at least {1}.")]
		public double Price { get; set; }

		[StringLength(1000, ErrorMessage = "{0} cannot exceed {1} characters.")]
		public string Description { get; set; } = string.Empty;

		[Required(ErrorMessage = "{0} is required")]
		[Range(1, int.MaxValue, ErrorMessage = "{0} is between {1} and {2}")]
		public int ProductCategoryId { get; set; }
	}
}