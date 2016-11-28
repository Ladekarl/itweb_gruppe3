using System.Collections.Generic;

namespace Exercise4.Models
{
    public class Category
    {
        public Category()
        {
            CategoryToComponentTypes = new List<CategoryToComponentType>();
        }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public ICollection<CategoryToComponentType> CategoryToComponentTypes
        {
            get; protected set;
        }
    }
}