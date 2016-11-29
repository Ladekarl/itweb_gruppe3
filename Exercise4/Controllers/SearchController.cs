using System.Collections;
using System.Collections.Generic;
using Exercise4.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exercise4.Controllers
{
    public class SearchController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index([FromFormAttribute] int componentNumber)
        {
            var component = new Component();
            component.ComponentNumber = componentNumber;
            List<Component> componentList = new List<Component>();
            componentList.Add(component);
            return View("Index", componentList);
        }
    }
}