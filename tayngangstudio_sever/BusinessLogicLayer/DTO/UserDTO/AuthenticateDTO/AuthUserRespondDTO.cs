using BusinessLogicLayer.DTO.Abstract.Base;
using DataAccessLayer.Models;

namespace BusinessLogicLayer.DTO.UserDTO.AuthenticateDTO
{
    public class AuthUserRespondDTO(User user, string jwtToken) : BaseDTO
    {
        public string Name { get; set; } = user.Name;
        public string Email { get; set; } = user.Email;
        public string Role { get; set; } = user.Role.ToString();

        public string AccessToken { get; set; } = jwtToken;
    }
}