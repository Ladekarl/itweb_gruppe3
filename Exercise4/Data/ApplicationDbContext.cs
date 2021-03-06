using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Exercise4.Models;

namespace Exercise4.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Component> Components { get; set; }
        public DbSet<ComponentType> ComponentTypes { get; set; }
        public DbSet<ESImage> EsImages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<CategoryToComponentType>()
            .HasKey(x => new {x.CategoryId,x.ComponentTypeId});

            builder.Entity<CategoryToComponentType>()
            .HasOne(ctc => ctc.Category)
            .WithMany(c => c.CategoryToComponentType)
            .HasForeignKey(ctc => ctc.CategoryId);

            builder.Entity<CategoryToComponentType>()
            .HasOne(ctc => ctc.ComponentType)
            .WithMany(c => c.CategoryToComponentType)
            .HasForeignKey(ctc => ctc.ComponentTypeId);

            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
