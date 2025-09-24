using BusinessLogicLayer.DTO.Abstract;
using DataAccessLayer.Models;

namespace BusinessLogicLayer.DTO
{
    public class CreateCartDTO
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public List<CartItemGetDTO> CartItems { get; set; } = [];
    }

    public class GetCartDTO : BaseGetDTO
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public List<CartItemGetDTO> CartItems { get; set; } = [];
    }

    public class UpdateCartDTO
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public List<CartItemGetDTO> CartItems { get; set; } = [];
    }
}