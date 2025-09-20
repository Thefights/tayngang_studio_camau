using DataAccessLayer.Enums;
using DataAccessLayer.Models.UserEntities;
using Swashbuckle.AspNetCore.Filters;

namespace tayngangstudio_sever.Examples
{
    internal class UserExample : IExamplesProvider<User>
    {
        public User GetExamples()
        {
            return new User
            {
                Id = 1,
                Name = "John Doe",
                Phone = "0778520124",
                Email = "phuckhang1088@gmail.com",
                Role = UserRoleEnum.Customer,
                Password = "hehe",
            };
        }
    }
}