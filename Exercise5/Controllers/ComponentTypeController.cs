using System.Collections.Generic;
using System.Linq;
using Exercise5.Models;
using Exercise5.Services;
using Exercise5.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Exercise5.Controllers
{
    [Authorize]
    public class ComponentTypeController : Controller
    {
        private readonly IComponentTypeData _componentDataType;
        private readonly ICategoryData _categoryData;

        public ComponentTypeController(IComponentTypeData componentDataType, ICategoryData categoryData)
        {
            _componentDataType = componentDataType;
            _categoryData = categoryData;
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            var categories = _categoryData.GetAll().Select(x => new SelectListItem
            {
                Value = x.CategoryId.ToString(),
                Text = x.Name
            }).ToList();

            categories.Add(new SelectListItem
            {
                Text = "All",
                Value = 0.ToString(),
                Selected = true
            });

            var model = new ComponentTypeViewModel
            {
                Types = _componentDataType.GetAll().ToList(),
                Categories = categories
            };

            return View(model);
        }

        [HttpGet("[controller]/Create")]
        public IActionResult Create()
        {
            var categories = _categoryData.GetAll().Select(x => new SelectListItem
            {    
                Value = x.CategoryId.ToString(),
                Text = x.Name
            }).ToList();


            var model = new ComponentTypeEditViewModel();
            model.Categories = categories;
            return View(model);
        }
        [HttpPost("[controller]/Create")]
        public IActionResult Create(ComponentTypeEditViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var newComponentType = new ComponentType()
            {
                ComponentName = model.ComponentName,
                ComponentInfo = model.ComponentInfo,
                Status = model.Status,
                Datasheet = model.DataSheet,
                ImageUrl = model.ImageUrl,
                Manufacturer = model.Manufacturer,
                WikiLink = model.Manufacturer,
                AdminComment = model.AdminComment,
            };
            model.CategorieIds.ToList().ForEach(x =>
                newComponentType.CategoryToComponentType.Add(new CategoryToComponentType() { CategoryId = (int) x })
            );
            _componentDataType.Add(newComponentType);
            _componentDataType.Commit();
            return RedirectToAction(nameof(Index));
        }

        [AllowAnonymous]
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

            var componentTypes = _componentDataType.GetByCategoryId(categoryId).ToList();
            var categories = _categoryData.GetAll().Select(x => new SelectListItem
            {
                Value = x.CategoryId.ToString(),
                Text = x.Name,
                Selected = x.CategoryId == categoryId
            }).ToList();


            categories.Add(new SelectListItem
            {
                Text = "All",
                Value = 0.ToString()
            });

            var ctvm = new ComponentTypeViewModel
            {
                Types = componentTypes,
                Categories = categories
            };
            return View(nameof(Index), ctvm);
        }
    }
}