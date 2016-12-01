using Exercise4.Models;
using Exercise4.Data;
using System.Collections.Generic;

namespace Exercise4.Services
{
    public interface IComponentTypeData 
    {
        ComponentType GetById(int id);
        IEnumerable<ComponentType> GetAll();
        ComponentType Add(ComponentType type);
        void Commit();
    }
    public class ComponentTypeData : IComponentTypeData
    {
        private ApplicationDbContext _context;
        public ComponentTypeData(ApplicationDbContext context)
        {
            _context = context;
        }
        public ComponentType GetById(int id)
        {
            return _context.ComponentTypes.Find(id);
        }
        public void Commit()
        {
            _context.SaveChanges();
        }
        public IEnumerable<ComponentType> GetAll()
        {
            return _context.ComponentTypes;
        }
        public ComponentType Add(ComponentType type)
        {
            _context.Add(type);
            return type;
        }
    }
}