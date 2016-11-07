using System.Data.Entity;
using Ambition.Framework.EntityFramework;

namespace Ambition.Product.Models
{
    public class ProductContext : DbContextBase
    {
        public ProductContext() : this("Product")
        {
        }

        public ProductContext(string nameOrConntectionString) : base(nameOrConntectionString)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ProductContext, Migrations.Configuration>());
        }

        public virtual DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().ToTable("Products");
        }
    }
}
