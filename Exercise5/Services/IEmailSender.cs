using System.Threading.Tasks;

namespace Exercise5.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
