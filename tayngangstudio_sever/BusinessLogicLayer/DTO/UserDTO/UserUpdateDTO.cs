using BusinessLogicLayer.DTO.Abstract.Base;

namespace BusinessLogicLayer.DTO.UserDTO
{
    public class UserUpdateDTO : BaseDTO
    {
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }
}
