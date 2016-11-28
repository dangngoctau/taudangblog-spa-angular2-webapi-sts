using System.Data.Entity;

namespace Ambition.Framework.EntityFramework
{
    public abstract class DbContextBase : DbContext, IDbContext
    {
        public DbContextBase(string nameOrConnectionString) : base(nameOrConnectionString)
        {
        }
    }
}
