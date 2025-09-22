using BusinessLogicLayer.DTO.Abstract;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO
{
    public class ProductCategoryCreateDTO
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;
    }

    public class ProductCategoryGetDTO : BaseGetDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class ProductCategoryUpdateDTO
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;
    }
}