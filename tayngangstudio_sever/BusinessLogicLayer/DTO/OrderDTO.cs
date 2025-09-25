using BusinessLogicLayer.DTO.Abstract;
using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO
{
    public class CreateOrderDTO
    {
        [Required(ErrorMessage = "{0} is required")]
        public DateTime OrderDate { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Range(0, double.MaxValue, ErrorMessage = "{0} must be a non-negative value.")]
        public double TotalAmount { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        public OrderStatusEnum Status { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Range(1, int.MaxValue, ErrorMessage = "{0} is between {1} and {2}")]
        public int? UserId { get; set; }

        public List<GetOrderDetailDTO> OrderDetails { get; set; } = [];
    }

    public class GetOrderDTO : BaseGetDTO
    {
        public DateTime OrderDate { get; set; }

        public double TotalAmount { get; set; }

        public OrderStatusEnum Status { get; set; }

        public int? UserId { get; set; }

        public List<GetOrderDetailDTO> OrderDetails { get; set; }
    }

    public class UpdateOrderDTO
    {
        [Required(ErrorMessage = "{0} is required")]
        public DateTime OrderDate { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Range(0, double.MaxValue, ErrorMessage = "{0} must be a non-negative value.")]
        public double TotalAmount { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        public OrderStatusEnum Status { get; set; }

        [Required(ErrorMessage = "{0} is required")]
        [Range(1, int.MaxValue, ErrorMessage = "{0} is between {1} and {2}")]
        public int? UserId { get; set; }

        public List<GetOrderDetailDTO> OrderDetails { get; set; } = [];
    }
}