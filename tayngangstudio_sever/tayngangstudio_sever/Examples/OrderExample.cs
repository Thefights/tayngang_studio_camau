using DataAccessLayer.Models.OrderEntities;
using Swashbuckle.AspNetCore.Filters;

namespace tayngangstudio_sever.Examples
{
    internal class OrderExample : IExamplesProvider<Order>
    {
        public Order GetExamples()
        {
            return new Order
            {
                Id = 1,
                OrderDate = DateTime.Now,
                TotalAmount = 100.0,
                Status = DataAccessLayer.Enums.OrderStatusEnum.Pending,
                UserId = 1,
                VoucherId = null,
            };
        }
    }
}