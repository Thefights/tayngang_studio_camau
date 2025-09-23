using DataAccessLayer.Enums;
using DataAccessLayer.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BusinessLogicLayer.DTO
{
    public class RegisterDTO
    {
        [Required]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "{0} must be between {2} and {1} characters long.")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$", ErrorMessage = "Invalid {0}, {0} have to be Vietnamese phone!")]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [EmailAddress(ErrorMessage = "Invalid {0}")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$", ErrorMessage = "{0} must be between 6 and 20 characters and contain one uppercase letter, one lowercase letter, one digit and one special character.")]
        public string Password { get; set; } = string.Empty;

        [JsonIgnore]
        public UserRoleEnum Role { get; set; } = UserRoleEnum.Admin;
    }

    public class LoginRequestDTO
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid {0}")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$", ErrorMessage = "{0} must be between 6 and 20 characters and contain one uppercase letter, one lowercase letter, one digit and one special character.")]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponDTO(User user, string jwtToken)
    {
        public string Name { get; set; } = user.Name;

        public string Email { get; set; } = user.Email;

        public string Role { get; set; } = user.Role.ToString();

        public string AccessToken { get; set; } = jwtToken;
    }
}