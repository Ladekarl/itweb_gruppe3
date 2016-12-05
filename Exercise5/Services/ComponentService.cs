using System.Collections.Generic;
using Exercise5.Data;
using Exercise5.Models;

namespace Exercise5.Services
{
    public interface IComponentService
    {
        IEnumerable<Component> GetAll();
        Component Get(long id);
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

        public Component Get(long id)
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