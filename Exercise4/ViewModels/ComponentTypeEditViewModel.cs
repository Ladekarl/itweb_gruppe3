using Exercise4.Models;

namespace Exercise4.ViewModels
{
    public class ComponentTypeEditViewModel
    {
        public string ComponentName{ get; set; }
        public string ComponentInfo{ get; set; }
        public ComponentTypeStatus Status{ get; set; }
        public string DataSheet{ get; set; }
        public string ImageUrl{ get; set; }
        public string Manufacturer{ get; set; }
        public string WikiLink{ get; set; }
        public string AdminComment{ get; set; }
    }
}