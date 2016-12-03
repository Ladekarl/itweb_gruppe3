using System.ComponentModel.DataAnnotations.Schema;

namespace Exercise4.Models
{
    public class CategoryToComponentType
    {
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [ForeignKey("ComponentType")]
        public long ComponentTypeId { get; set; } 
        public ComponentType ComponentType { get; set; }
    }
}