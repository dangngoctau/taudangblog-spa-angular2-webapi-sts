using Ambition.Framework.EntityFramework;

namespace Ambition.Product.Models
{
    public class Product : EntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
