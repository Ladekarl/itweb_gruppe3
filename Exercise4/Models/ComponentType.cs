using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace Exercise4.Models
{
    public class ComponentType
    {
        public ComponentType()
        {
            Components = new List<Component>();
            CategoryToComponentType = new List<CategoryToComponentType>();
        }
        public long ComponentTypeId { get; set; }
        [DisplayName("Name")]
        [Required(ErrorMessage = "Component name is required")]
        public string ComponentName { get; set; }
        [DisplayName("Information about the component")]
        public string ComponentInfo { get; set; }
        public string Location { get; set; }
        public ComponentTypeStatus Status { get; set; }
        public string Datasheet { get; set; }
        public string ImageUrl { get; set; }
        public string Manufacturer { get; set; }
        public string WikiLink { get; set; }
        public string AdminComment { get; set; }
        public virtual ESImage Image { get; set; }
        public ICollection<Component> Components { get; protected set; }
        public ICollection<CategoryToComponentType> CategoryToComponentType { get; set; }
    }
}