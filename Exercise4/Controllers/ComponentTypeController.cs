using Exercise4.Models;
using Exercise4.Services;
using Exercise4.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Exercise4.Controllers
{
    public class ComponentTypeController : Controller
    {
        private readonly IComponentTypeData _componentDataType;
        private readonly ICategoryData _categoryData;

        public ComponentTypeController(IComponentTypeData componentDataType, ICategoryData categoryData)
        {
            _componentDataType = componentDataType;
            _categoryData = categoryData;
        }

        public IActionResult Index()
        {
            var categories = _categoryData.GetAll().Select(x => new SelectListItem
            {
                Value = x.CategoryId.ToString(),
                Text = x.Name
            });

            var selectListItems = categories as IList<SelectListItem> ?? categories.ToList();

            selectListItems.Add(new SelectListItem
            {
                Text = "All",
                Value = 0.ToString(),
                Selected = true
            });

            var model = new ComponentTypeViewModel
            {
                Types = _componentDataType.GetAll(),
                Categories = selectListItems
            };

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

        public IActionResult Filter([FromQuery] int categoryId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (categoryId == 0)
            {
                return RedirectToAction(nameof(Index));
            }

            var componentTypes = _componentDataType.GetAll().Where(
                c => c.Categories.FirstOrDefault(cat => cat.CategoryId == categoryId) != null);

            var categories = _categoryData.GetAll().Select(x => new SelectListItem
            {
                Value = x.CategoryId.ToString(),
                Text = x.Name,
                Selected = x.CategoryId == categoryId
            });

            var selectListItems = categories as IList<SelectListItem> ?? categories.ToList();

            selectListItems.Add(new SelectListItem
            {
                Text = "All",
                Value = 0.ToString()
            });

            var ctvm = new ComponentTypeViewModel
            {
                Types = componentTypes.ToList(),
                Categories = selectListItems
            };
            return View(nameof(Index), ctvm);
        }
    }
}