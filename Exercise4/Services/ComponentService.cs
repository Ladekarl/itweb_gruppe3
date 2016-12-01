using System.Collections.Generic;
using Exercise4.Models;
using Exercise4.Data;

namespace Exercise4.Services
{
    public interface IComponentService
    {
        IEnumerable<Component> GetAll();
        Component Get(int id);
        Component Add(Component newCategory);
        void Remove(Component component);
        void Commit();
    }

    public class ComponentService : IComponentService
    {
        private ApplicationDbContext _context;
        public ComponentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Component Add(Component newComponent)
        {
            _context.Add(newComponent);
            return newComponent;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public Component Get(int id)
        {
            return _context.Components.Find(id);
        }

        public IEnumerable<Component> GetAll()
        {
            return _context.Components;
        }

        public void Remove(Component component)
        {
            _context.Components.Remove(component);
        }
    }
}