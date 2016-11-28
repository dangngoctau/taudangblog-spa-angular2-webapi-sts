using System.Threading.Tasks;
using System.Web.Http;
using Ambition.Product.Services;
using Ambition.Product.ViewModels;
using System;

namespace Ambition.Product.Controllers
{
    [Authorize]
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [Route("load")]
        [HttpGet]
        public async Task<IHttpActionResult> Load()
        {
            var products = await _productService.LoadProductsAsync();
            return Ok(products);
        }

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> Create(ProductCreateViewModel viewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var product = await _productService.CreateProductAsync(viewModel);

            return Created("/product/" + product, product);
        }
    }
}
