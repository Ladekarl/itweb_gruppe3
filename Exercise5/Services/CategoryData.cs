using System.Collections.Generic;
using Exercise5.Data;
using Exercise5.Models;

namespace Exercise5.Services
{
    public interface ICategoryData
    {
        IEnumerable<Category> GetAll();
        Category Get(int id);
        Category Add(Category newCategory);

        void Remove(Category Category);
        void Commit();
    }

    public class CategoryData : ICategoryData
    {
        private ApplicationDbContext _context;
        public CategoryData(ApplicationDbContext context) 
        {
            _context = context;
        }

        public Category Add(Category newCategory)
        {
            _context.Add(newCategory);
            return newCategory;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public Category Get(int id)
        {
            return _context.Categories.Find(id);
        }

        public IEnumerable<Category> GetAll()
        {
            return _context.Categories;
        }

        public void Remove(Category Category)
        {
            _context.Categories.Remove(Category);
        }
    }
}