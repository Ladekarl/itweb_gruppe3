using Exercise4.Models;
using Exercise4.Services;
using Exercise4.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Exercise4.Controllers
{
    public class ComponentTypeController : Controller
    {
        private IComponentTypeData _componentDataType;
        public ComponentTypeController(IComponentTypeData componentDataType)
        {
            _componentDataType = componentDataType;
        }

        public IActionResult Index()
        {
            var model = new ComponentTypeViewModel();
            model.Types = _componentDataType.GetAll();
            return View(model);
        }

        [HttpGet("[controller]/Create")]
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost("[controller]/Create")]
        public IActionResult Create(ComponentTypeEditViewModel model)
        {
            if (ModelState.IsValid)
            {
                var newComponentType = new ComponentType();
                newComponentType.ComponentName = model.ComponentName;
                newComponentType.ComponentInfo = model.ComponentInfo;
                newComponentType.Status = model.Status;
                newComponentType.Datasheet = model.DataSheet;
                newComponentType.ImageUrl = model.ImageUrl;
                newComponentType.Manufacturer = model.Manufacturer;
                newComponentType.WikiLink = model.Manufacturer;
                newComponentType.AdminComment = model.AdminComment;
                _componentDataType.Add(newComponentType);
                _componentDataType.Commit();
                return RedirectToAction(nameof(Index));
            }
            return View();
        }
    }
}