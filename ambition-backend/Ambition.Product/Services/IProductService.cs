using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ambition.Framework;
using Ambition.Product.ViewModels;

namespace Ambition.Product.Services
{
    public interface IProductService : IDependency
    {
        /// <summary>
        /// Create product.
        /// </summary>
        /// <param name="viewModel"></param>
        /// <returns></returns>
        Task<Guid> CreateProductAsync(ProductCreateViewModel viewModel);

        /// <summary>
        /// Load products.
        /// </summary>
        /// <returns></returns>
        Task<ICollection<ProductGetViewModel>> LoadProductsAsync();

        /// <summary>
        /// Get product.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ProductGetViewModel> GetProductAsync(Guid id);
    }
}