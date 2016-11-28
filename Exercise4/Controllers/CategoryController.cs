using Microsoft.AspNetCore.Mvc;

namespace Exercise4.Controllers
{
    public class CategoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}