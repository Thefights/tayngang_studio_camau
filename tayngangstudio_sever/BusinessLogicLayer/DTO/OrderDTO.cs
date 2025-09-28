using BusinessLogicLayer.DTO.Abstract;
using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO
{
    public class CreateOrderDTO
    {
        public int? UserId { get; set; }

        [Required]
        public PaymentMethodEnum PaymentMethod { get; set; }

        [Required]
        public List<CreateOrderDetailDTO> OrderDetails { get; set; } = [];
    }

    public class GetOrderDTO : BaseGetDTO
    {
        public DateTime OrderDate { get; set; }

        public OrderStatusEnum Status { get; set; }

        public int? UserId { get; set; }

        public List<GetOrderDetailDTO> OrderDetails { get; set; }
    }

    public class UpdateOrderDTO
    {
        public int? UserId { get; set; }

        public OrderStatusEnum Status { get; set; }
    }
}