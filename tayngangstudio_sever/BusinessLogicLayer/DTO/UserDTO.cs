using BusinessLogicLayer.DTO.Abstract;
using System.ComponentModel.DataAnnotations;

namespace BusinessLogicLayer.DTO
{
    public class UserCreateDTO
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$", ErrorMessage = "Invalid {0}, {0} have to be Vietnamese phone!")]
        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;
    }

    public class UserGetDTO : BaseGetDTO
    {
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }

    public class UserUpdateDTO
    {
        public string FullName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }
}
