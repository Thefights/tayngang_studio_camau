using BusinessLogicLayer.DTO.Abstract;

namespace BusinessLogicLayer.DTO
{
    public class CreateCartDTO
    {
        public List<GetCartItemDTO> CartItems { get; set; } = [];
    }

    public class GetCartDTO : BaseGetDTO
    {
        public List<GetCartItemDTO> CartItems { get; set; } = [];
    }

    public class UpdateCartDTO
    {
        public List<GetCartItemDTO> CartItems { get; set; } = [];
    }
}