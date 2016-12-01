using System.Collections.Generic;
using Exercise4.Models;
using Exercise4.Data;

namespace Exercise4.Services
{
    public interface IComponentTypeService
    {
        IEnumerable<ComponentType> GetAll();
        ComponentType Get(int id);
        ComponentType Add(ComponentType newComponentType);
        void Remove(ComponentType componentType);
        void Commit();
    }

    public class ComponentTypeService : IComponentTypeService
    {
        private ApplicationDbContext _context;
        public ComponentTypeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public ComponentType Add(ComponentType newComponentType)
        {
            _context.Add(newComponentType);
            return newComponentType;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public ComponentType Get(int id)
        {
            return _context.ComponentTypes.Find(id);
        }

        public IEnumerable<ComponentType> GetAll()
        {
            return _context.ComponentTypes;
        }

        public void Remove(ComponentType componentType)
        {
            _context.ComponentTypes.Remove(componentType);
        }
    }
}