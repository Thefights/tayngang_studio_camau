using BusinessLogicLayer.Helpers;
using System.Net;
using System.Net.Mail;

namespace BusinessLogicLayer.Implements.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string message);
    }

    public class EmailService(AppConfiguration configuration) : IEmailService
    {
        public async Task SendEmailAsync(string toEmail, string subject, string message)
        {
            var client = new SmtpClient(configuration.SmtpSettings.Server, configuration.SmtpSettings.Port)
            {
                Credentials = new NetworkCredential(configuration.SmtpSettings.Username, configuration.SmtpSettings.Password),
                EnableSsl = configuration.SmtpSettings.EnableSsl,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(configuration.SmtpSettings.Username, configuration.SmtpSettings.FromAddress),
                Subject = subject,
                Body = message,
                IsBodyHtml = true,
            };
            mailMessage.To.Add(toEmail);

            await client.SendMailAsync(mailMessage);
        }
    }
}
