using System.Collections.Generic;
using Exercise5.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Exercise5.ViewModels
{
    public class ComponentTypeViewModel
    {
        public IEnumerable<ComponentType> Types{ get; set; }

        public IEnumerable<SelectListItem> Categories { get; set; }
    }
}