using BusinessLogicLayer.DTO.Abstract.Base;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO.Abstract.ImageDTO
{
    public abstract class GetImageDTO : BaseDTO
    {
        [Required]
        public string ImageUrl { get; set; } = string.Empty;
    }
}