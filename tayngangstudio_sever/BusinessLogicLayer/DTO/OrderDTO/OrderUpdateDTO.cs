using BusinessLogicLayer.DTO.Abstract.Base;
using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO.OrderDTO
{
    public class OrderUpdateDTO : BaseDTO
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

        public int? VoucherId { get; set; }

        public List<OrderGetDTO> OrderDetails { get; set; } = [];
    }
}