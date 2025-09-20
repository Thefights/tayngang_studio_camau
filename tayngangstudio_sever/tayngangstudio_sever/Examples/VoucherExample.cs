using DataAccessLayer.Enums;
using DataAccessLayer.Models.UserEntities;
using Swashbuckle.AspNetCore.Filters;

namespace tayngangstudio_sever.Examples
{
    internal class VoucherExample : IExamplesProvider<Voucher>
    {
        public Voucher GetExamples()
        {
            return new Voucher
            {
                Id = 1,
                Name = "10% Discount",
                Quantity = 10,
                Description = "10% off on your order",
                Code = "DISCOUNT10",
                DiscountAmount = 10.0,
                ExpiryDate = DateTime.UtcNow.AddMonths(1),
                Status = VoucherStatusEnum.Active
            };
        }
    }
}