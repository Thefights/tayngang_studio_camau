using BusinessLogicLayer.DTO.Abstract;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO
{
	public class CreateProductCategoryDTO
	{
		[Required(ErrorMessage = "{0} is required")]
		public string Name { get; set; } = string.Empty;

		[Required(ErrorMessage = "{0} is required")]
		public string Description { get; set; } = string.Empty;
	}

	public class GetProductCategoryDTO : BaseGetDTO
	{
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
	}

	public class UpdateProductCategoryDTO
	{
		[Required(ErrorMessage = "{0} is required")]
		public string Name { get; set; } = string.Empty;

		[Required(ErrorMessage = "{0} is required")]
		public string Description { get; set; } = string.Empty;
	}
}