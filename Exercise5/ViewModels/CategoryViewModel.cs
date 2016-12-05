using System.Collections.Generic;
using Exercise5.Models;

namespace Exercise5.ViewModels
{
    public class CategoryViewModel
    {
        public IEnumerable<Category> Categories { get; set; }
    }
}