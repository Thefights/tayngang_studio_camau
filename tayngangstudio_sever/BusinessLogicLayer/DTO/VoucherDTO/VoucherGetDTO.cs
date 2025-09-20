using BusinessLogicLayer.DTO.Abstract.Base;
using DataAccessLayer.Enums;

namespace BusinessLogicLayer.DTO.VoucherDTO
{
    public class VoucherGetDTO : BaseDTO
    {
        public string Name { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public string Description { get; set; } = string.Empty;

        public string Code { get; set; } = string.Empty;

        public decimal DiscountAmount { get; set; }

        public DateTime ExpiryDate { get; set; }

        public VoucherStatusEnum Status { get; set; }
    }
}