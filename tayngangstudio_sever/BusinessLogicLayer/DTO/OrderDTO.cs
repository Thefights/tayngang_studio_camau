using BusinessLogicLayer.DTO.Abstract;
using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO
{
    public class OrderCreateDTO
    {
        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "{0} must be a non-negative value.")]
        public double TotalAmount { get; set; }

        [Required]
        public OrderStatusEnum Status { get; set; }

        [Required]
        public int UserId { get; set; }

        public List<OrderDetailGetDTO> OrderDetails { get; set; } = [];
    }

    public class OrderGetDTO : BaseGetDTO
    {
        public DateTime OrderDate { get; set; }

        public double TotalAmount { get; set; }

        public OrderStatusEnum Status { get; set; }

        public int UserId { get; set; }

        public List<OrderDetailGetDTO> OrderDetails { get; set; }
    }

    public class OrderUpdateDTO
    {
        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "{0} must be a non-negative value.")]
        public double TotalAmount { get; set; }

        [Required]
        public OrderStatusEnum Status { get; set; }

        [Required]
        public int UserId { get; set; }

        public List<OrderDetailGetDTO> OrderDetails { get; set; } = [];
    }
}
