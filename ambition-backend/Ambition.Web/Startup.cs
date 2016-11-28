using System.Web.Http;
using Ambition.Framework;
using Ambition.Web.App_Start;
using Autofac.Integration.WebApi;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;

[assembly: OwinStartup(typeof(Ambition.Web.Startup))]
namespace Ambition.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);

            app.RegisterAuthConfiguration();

            var container = DependencyRegistration.GetDependencies();

            var config = new HttpConfiguration();
            config.RegisterWebApiConfiguration();

            var resolver = new AutofacWebApiDependencyResolver(container);
            config.DependencyResolver = resolver;

            //app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(config);
            app.UseWebApi(config);

            app.UseWelcomePage("/");
        }
    }
}
