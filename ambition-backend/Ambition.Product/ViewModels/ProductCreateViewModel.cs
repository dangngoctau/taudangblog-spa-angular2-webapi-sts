using System.ComponentModel.DataAnnotations;

namespace Ambition.Product.ViewModels
{
    public class ProductCreateViewModel
    {
        [Required]
        public string Name { get; set; }
        
        public string Description { get; set; }
    }
}
