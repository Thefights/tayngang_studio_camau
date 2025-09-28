using BusinessLogicLayer.DTO.Abstract;
using DataAccessLayer.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BusinessLogicLayer.DTO
{
    public class CreateOrderDTO
    {
        [JsonIgnore]
        public OrderStatusEnum Status { get; set; } = OrderStatusEnum.Pending;

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
        public OrderStatusEnum Status { get; set; }
    }
}