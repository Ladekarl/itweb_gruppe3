using Exercise4.Models;
using Exercise4.Services;
using Exercise4.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Exercise4.Controllers
{
    public class CategoryController : Controller
    {
        private ICategoryData _categoryData;
        public CategoryController(ICategoryData categoryData)
        {
            _categoryData = categoryData;
        }

        public IActionResult Index()
        {
            var model = new CategoryViewModel();
            model.Categories = _categoryData.GetAll();
            return View(model);
        }

        [HttpGet("[controller]/Create")]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost("[controller]/Create")]
        public IActionResult Create(CategoryEditViewModel model)
        {
            if (ModelState.IsValid)
            {
                var newCategory = new Category();
                newCategory.Name = model.Name;
                _categoryData.Add(newCategory);
                _categoryData.Commit();
                return RedirectToAction(nameof(Index));
            }
            return View();
        }
    }
}