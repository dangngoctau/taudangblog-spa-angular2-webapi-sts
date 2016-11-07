using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Threading.Tasks;
using Ambition.Framework.EntityFramework;
using Ambition.Framework.Exceptions;
using Ambition.Product.Models;
using Ambition.Product.ViewModels;

namespace Ambition.Product.Services
{
    public class ProductService : IProductService
    {
        private readonly IDbContextFactory<ProductContext> _productContext;

        public ProductService(IDbContextFactory<ProductContext> productContext)
        {
            _productContext = productContext;
        }

        public async Task<Guid> CreateProductAsync(ProductCreateViewModel viewModel)
        {
            var newProduct = new Models.Product
            {
                Id = Guid.NewGuid(),
                Name = viewModel.Name,
                Description = viewModel.Description
            };

            using (var dbContext = _productContext.Get())
            {
                dbContext.Products.Add(newProduct);
                await dbContext.SaveChangesAsync();

                return newProduct.Id;
            }
        }

        public async Task<ProductGetViewModel> GetProductAsync(Guid id)
        {
            using (var dbContext = _productContext.Get())
            {
                var product = await dbContext.Products.FindAsync(id);
                if (product == null)
                {
                    throw new GeneralException("Product id {0} not found", id);
                }

                return new ProductGetViewModel
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description
                };
            }
        }

        public async Task<ICollection<ProductGetViewModel>> LoadProductsAsync()
        {
            using (var dbContext = _productContext.Get())
            {
                var products = await dbContext.Products.ToArrayAsync();

                var retVal = new Collection<ProductGetViewModel>();
                foreach (var product in products)
                {
                    retVal.Add(new ProductGetViewModel
                    {
                        Id = product.Id,
                        Name = product.Name,
                        Description = product.Description
                    });
                }

                return retVal;
            }
        }
    }
}
