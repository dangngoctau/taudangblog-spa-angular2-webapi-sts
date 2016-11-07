using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ambition.Framework;
using Ambition.Product.ViewModels;

namespace Ambition.Product.Services
{
    public interface IProductService: IDependency
    {
        Task<Guid> CreateProductAsync(ProductCreateViewModel viewModel);
        Task<ICollection<ProductGetViewModel>> LoadProductsAsync();
        Task<ProductGetViewModel> GetProductAsync(Guid id);
    }
}