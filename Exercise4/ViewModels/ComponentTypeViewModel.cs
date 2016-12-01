using System.Collections.Generic;
using Exercise4.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Exercise4.ViewModels
{
    public class ComponentTypeViewModel
    {
        public IEnumerable<ComponentType> Types{ get; set; }

        public IEnumerable<SelectListItem> Categories { get; set; }
    }
}