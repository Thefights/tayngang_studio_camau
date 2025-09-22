using BusinessLogicLayer.DTO.Abstract.Base;
using BusinessLogicLayer.DTO.OrderDetailDTO;
using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO.OrderDTO
{
    public class OrderUpdateDTO : BaseUpdateDTO
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