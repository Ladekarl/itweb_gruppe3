using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exercise4.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Exercise4.ViewModels
{
    public class ComponentViewModel
    {
        public List<Component> Components { get; set; }
        public IEnumerable<SelectListItem> ComponentTypes { get; set; }
    }
}
