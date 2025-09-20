namespace DataAccessLayer.Models.UserEntities
{
    public class UserVoucher
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int VoucherId { get; set; }
        public Voucher Voucher { get; set; }

        public bool IsUsed { get; set; }
    }
}