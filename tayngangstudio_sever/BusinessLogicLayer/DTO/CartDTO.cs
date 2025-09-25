using BusinessLogicLayer.DTO.Abstract;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO
{
    public class CreateCartDTO
    {
        [Required(ErrorMessage = "{0} is required")]
        [Range(1, int.MaxValue, ErrorMessage = "{0} is between {1} and {2}")]
        public int? UserId { get; set; }

        public List<GetCartItemDTO> CartItems { get; set; } = [];
    }

    public class GetCartDTO : BaseGetDTO
    {
        public int? UserId { get; set; }

        public List<GetCartItemDTO> CartItems { get; set; } = [];
    }

    public class UpdateCartDTO
    {
        [Required(ErrorMessage = "{0} is required")]
        [Range(1, int.MaxValue, ErrorMessage = "{0} is between {1} and {2}")]
        public int? UserId { get; set; }

        public List<GetCartItemDTO> CartItems { get; set; } = [];
    }
}