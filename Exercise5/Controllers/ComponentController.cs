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
    public class ComponentController : Controller
    {
        private readonly IComponentService _componentService;
        private readonly IComponentTypeData _componentTypeData;

        public ComponentController(IComponentService componentService, IComponentTypeData componentTypeData)
        {
            _componentService = componentService;
            _componentTypeData = componentTypeData;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var components = _componentService.GetAll();

            var componentTypes = _componentTypeData.GetAll().Select(x => new SelectListItem
            {
                Value = x.ComponentTypeId.ToString(),
                Text = x.ComponentName
            });

            var selectListItems = componentTypes as IList<SelectListItem> ?? componentTypes.ToList();

            selectListItems.Add(new SelectListItem
            {
                Text = "All",
                Value = 0.ToString(),
                Selected = true
            });

            var cwm = new ComponentViewModel
            {
                Components = components.ToList(),
                ComponentTypes = selectListItems
            };

            return View(cwm);
        }

        [Authorize, HttpGet]
        public IActionResult Create()
        {
            var componentTypes = _componentTypeData.GetAll().Select(x => new SelectListItem
            {
                Value = x.ComponentTypeId.ToString(),
                Text = x.ComponentName
            });

            return View(new ComponentEditViewModel {ComponentTypes = componentTypes});
        }

        [Authorize, HttpPost]
        public IActionResult Create([FromForm] ComponentEditViewModel componentViewModel)
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

        [Authorize, HttpGet]
        public IActionResult Edit([FromRoute] int id)
        {
            var component = _componentService.Get(id);

            var componentTypes = _componentTypeData.GetAll().Select(x => new SelectListItem
            {
                Value = x.ComponentTypeId.ToString(),
                Text = x.ComponentName
            });

            var cvm = new ComponentEditViewModel
            {
                ComponentNumber = component.ComponentNumber,
                Status = component.Status,
                AdminComment = component.AdminComment,
                SerialNo = component.SerialNo,
                UserComment = component.UserComment,
                ComponentTypes = componentTypes
            };

            return View(cvm);
        }

        [Authorize, HttpPost]
        public IActionResult Edit([FromRoute] int id, [FromForm] ComponentEditViewModel c)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var component = _componentService.Get(id);

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

        [Authorize, HttpGet]
        public IActionResult Delete([FromRoute] int id)
        {
            var component = _componentService.Get(id);

            if (component == null)
            {
                return NotFound();
            }

            _componentService.Remove(component);
            _componentService.Commit();

            return RedirectToAction("Index");
        }

        public IActionResult Filter([FromQuery] int componentTypeId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (componentTypeId == 0)
            {
                return RedirectToAction("Index");
            }

            var components = _componentService.GetAll().Where(c => c.ComponentTypeId == componentTypeId);

            var componentTypes = _componentTypeData.GetAll().Select(x => new SelectListItem
            {
                Value = x.ComponentTypeId.ToString(),
                Text = x.ComponentName,
                Selected = x.ComponentTypeId == componentTypeId
            });

            var selectListItems = componentTypes as IList<SelectListItem> ?? componentTypes.ToList();

            selectListItems.Add(new SelectListItem
            {
                Text = "All",
                Value = 0.ToString()
            });

            var cwm = new ComponentViewModel
            {
                Components = components.ToList(),
                ComponentTypes = selectListItems,
            };

            return View(nameof(Index), cwm);
        }
    }
}