using System.Collections.Generic;

namespace Exercise4.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public ICollection<CategoryToComponentType> CategoryToComponentType { get; set; }
    }
}