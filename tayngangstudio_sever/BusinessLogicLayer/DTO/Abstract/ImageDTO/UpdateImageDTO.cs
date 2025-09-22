using BusinessLogicLayer.DTO.Abstract.Base;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO.Abstract.ImageDTO
{
    public abstract class UpdateImageDTO : BaseUpdateDTO
    {
        [Required]
        public IFormFile ImageFile { get; set; }
    }
}