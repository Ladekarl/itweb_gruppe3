using System.Collections.Generic;
using Exercise5.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Exercise5.ViewModels
{
    public class ComponentViewModel
    {
        public List<Component> Components { get; set; }
        public IEnumerable<SelectListItem> ComponentTypes { get; set; }
    }
}
