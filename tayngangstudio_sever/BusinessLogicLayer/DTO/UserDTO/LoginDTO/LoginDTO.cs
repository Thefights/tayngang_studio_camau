using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO.UserDTO.LoginDTO
{
    public class LoginDTO
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid {0}")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$", ErrorMessage = "{0} must be between 6 and 20 characters and contain one uppercase letter, one lowercase letter, one digit and one special character.")]
        public string Password { get; set; } = string.Empty;
    }
}