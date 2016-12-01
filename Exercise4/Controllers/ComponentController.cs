using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exercise4.Models;
using Exercise4.Services;
using Exercise4.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Exercise4.Controllers
{
    public class ComponentController : Controller
    {
        private readonly IComponentService _componentService;
        private IComponentTypeService _componentTypeService;

        public ComponentController(IComponentService componentService, IComponentTypeService componentTypeService)
        {
            _componentService = componentService;
            _componentTypeService = componentTypeService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var components = _componentService.GetAll();
            return View(components);
        }

        [HttpGet]
        public IActionResult Create()
        {
            var componentTypes = _componentTypeService.GetAll().Select(x => new SelectListItem
            {
                Value = x.ComponentTypeId.ToString(),
                Text = x.ComponentName
            });

            return View(new ComponentViewModel {ComponentTypes = componentTypes});
        }

        [HttpPost]
        public IActionResult Create([FromForm] ComponentViewModel componentViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var component = new Component
            {
                ComponentTypeId = componentViewModel.ComponentTypeId,
                ComponentNumber = componentViewModel.ComponentNumber,
                Status = componentViewModel.Status,
                SerialNo = componentViewModel.SerialNo,
                UserComment = componentViewModel.UserComment,
                AdminComment = componentViewModel.AdminComment
            };

            _componentService.Add(component);
            _componentService.Commit();

            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var component = _componentService.Get(id);
            return View(component);
        }

        [HttpPost]
        public IActionResult Edit([FromForm] Component c)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var component = _componentService.Get(c.ComponentId);

            component.ComponentNumber = c.ComponentNumber;
            component.AdminComment = c.AdminComment;
            component.SerialNo = c.SerialNo;
            component.UserComment = c.UserComment;
            component.ComponentTypeId = c.ComponentTypeId;
            component.Status = c.Status;
            component.CurrentLoanInformationId = c.CurrentLoanInformationId;

            _componentService.Commit();

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            var component = _componentService.Get(id);

            if (component == null)
            {
                return NotFound();
            }

            _componentService.Remove(component);
            _componentService.Commit();

            return RedirectToAction(nameof(Index));
        }
    }
}