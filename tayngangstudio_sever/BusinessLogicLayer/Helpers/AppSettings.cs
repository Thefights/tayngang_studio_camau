namespace BusinessLogicLayer.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }

        //In days
        public int RefreshTokenTTL { get; set; }
    }
}