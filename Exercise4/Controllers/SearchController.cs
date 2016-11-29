using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Exercise4.Models;
using Exercise4.Services;
using Microsoft.AspNetCore.Mvc;

namespace Exercise4.Controllers
{
    public class SearchController : Controller
    {
        private IComponentService _componentService;
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
            return View("Index", _componentService.GetAll().Where(c => c.ComponentNumber.Equals(componentNumber)));
        }
    }
}