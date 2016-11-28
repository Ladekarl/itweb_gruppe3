using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Exercise4.Models
{
    public class CategoryToComponentType
    {
        public long CategoryToComponentTypeId { get; set; }
        public Category Category { get; set; }
        public ComponentType ComponentType { get; set; }
    }
}