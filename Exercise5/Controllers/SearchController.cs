using System.Linq;
using Exercise5.Services;
using Microsoft.AspNetCore.Mvc;

namespace Exercise5.Controllers
{
    public class SearchController : Controller
    {
        private readonly IComponentService _componentService;
        public SearchController(IComponentService componentService)
        {
            _componentService = componentService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index([FromForm] int componentNumber)
        {
            return View("Index", _componentService.GetAll().Where(c => c.ComponentNumber.Equals(componentNumber)).ToList());
        }
    }
}