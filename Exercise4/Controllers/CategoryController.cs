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

        public IActionResult Create()
        {
            return View();
        }

        [HttpPostAttribute]
        [ValidateAntiForgeryTokenAttribute]
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

        public IActionResult Edit(int id)
        {
            var model = _categoryData.Get(id);
            if (model == null)
            {
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        [HttpPostAttribute]
        [ValidateAntiForgeryTokenAttribute]
        public IActionResult Edit(int id, CategoryEditViewModel model)
        {
            var category = _categoryData.Get(id);
            if (ModelState.IsValid)
            {
                category.Name = model.Name;
                _categoryData.Commit();
                return RedirectToAction(nameof(Index));
            }
            return View(category);
        }

        public IActionResult Delete(int id)
        {
            var model = _categoryData.Get(id);
            if (model == null)
            {
                return RedirectToAction(nameof(Index));
            }
            return View(model);
        }

        [HttpPostAttribute, ActionNameAttribute("Delete")]
        [ValidateAntiForgeryTokenAttribute]
        public IActionResult DeleteConfirmed(int id)
        {
            var model = _categoryData.Get(id);
            if (model == null)
            {
                return RedirectToAction(nameof(Index));
            }
            _categoryData.Remove(model);
            _categoryData.Commit();
            return RedirectToAction(nameof(Index));
        }

    }
}