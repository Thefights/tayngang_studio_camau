using BusinessLogicLayer.DTO.Abstract.Base;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO.Abstract.ImageDTO
{
    public abstract class UpdateImageDTO : BaseDTO
    {
        [Required]
        public IFormFile ImageFile { get; set; }
    }
}