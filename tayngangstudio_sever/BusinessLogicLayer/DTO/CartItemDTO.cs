using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO
{
    public class GetCartItemDTO
    {
        [Required(ErrorMessage = "{0} is required")]
        [Range(1, int.MaxValue, ErrorMessage = "{0} cannot be negative.")]
        public int Quantity { get; set; } = 1;

        [Required(ErrorMessage = "{0} is required")]
        [Range(1, double.MaxValue, ErrorMessage = "{0} cannot be lower 1.")]
        public double UnitPrice { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        public int? ProductId { get; set; }
    }
}