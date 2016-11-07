namespace Ambition.Framework.EntityFramework
{
    public interface IDbContextFactory<T> where T : IDbContext, new()
    {
        T Get();
    }
}