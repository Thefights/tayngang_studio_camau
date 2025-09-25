using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO.Abstract
{
    public abstract class CreateImageDTO
    {
                [Required(ErrorMessage = "{0} is required")]
        public IFormFile? ImageFile { get; set; }
    }

    public abstract class GetImageDTO : BaseGetDTO
    {
        public string ImageUrl { get; set; } = string.Empty;
    }

    public abstract class UpdateImageDTO
    {
        public IFormFile? ImageFile { get; set; }
    }
}