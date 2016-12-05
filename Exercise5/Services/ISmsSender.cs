using System.Threading.Tasks;

namespace Exercise5.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
