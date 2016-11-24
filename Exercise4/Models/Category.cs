using System.Collections.Generic;

namespace Exercise4.Models
{
    public class Category
    {
        public Category()
        {
            ComponentTypes = new List<ComponentType>();
        }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public ICollection<ComponentType> ComponentTypes
        {
            get; protected set;
        }
    }
}