namespace Ambition.Framework.EntityFramework
{
    public class DbContextFactory<T> : IDbContextFactory<T> where T : IDbContext, new()
    {
        public T Get()
        {
            return new T();
        }
    }
}
