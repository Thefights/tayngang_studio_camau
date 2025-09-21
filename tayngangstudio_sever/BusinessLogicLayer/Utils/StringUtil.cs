namespace BusinessLogicLayer.Utils
{
    public static class StringUtil
    {
        public static string GenerateSecurePassword(int length = 12)
        {
            const string lower = "abcdefghijklmnopqrstuvwxyz";
            const string upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string digits = "0123456789";
            const string special = "!@#$%^&*()-_=+[]{};:,.<>?";

            var random = new Random();

            var chars = new List<char>
    {
        lower[random.Next(lower.Length)],
        upper[random.Next(upper.Length)],
        digits[random.Next(digits.Length)],
        special[random.Next(special.Length)]
    };

            string all = lower + upper + digits + special;
            for (int i = chars.Count; i < length; i++)
            {
                chars.Add(all[random.Next(all.Length)]);
            }

            return new string(chars.OrderBy(_ => random.Next()).ToArray());
        }
    }
}
