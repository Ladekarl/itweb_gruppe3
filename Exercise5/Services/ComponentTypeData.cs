using System.Collections.Generic;
using System.Linq;
using Exercise5.Data;
using Exercise5.Models;

namespace Exercise5.Services
{
    public interface IComponentTypeData 
    {
        ComponentType GetById(int id);
        IQueryable<ComponentType> GetAll();
        ComponentType Add(ComponentType type);
        void Commit();
        IEnumerable<ComponentType> GetByCategoryId(int categoryId);
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
        public IEnumerable<ComponentType> GetByCategoryId(int categoryId)
        {
            return _context.Categories
                .Where(c => c.CategoryId == categoryId)
                .SelectMany(c => c.CategoryToComponentType.Select(cc => cc.ComponentType))
                .ToList();
        }
        public IQueryable<ComponentType> GetAll()
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