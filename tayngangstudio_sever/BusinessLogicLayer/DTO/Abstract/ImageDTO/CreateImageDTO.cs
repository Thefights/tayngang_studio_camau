using BusinessLogicLayer.DTO.Abstract.Base;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO.Abstract.ImageDTO
{
    public abstract class CreateImageDTO : BaseDTO
    {
        [Required]
        public IFormFile ImageFile { get; set; }
    }
}