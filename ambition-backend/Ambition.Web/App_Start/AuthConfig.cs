using Owin;
using IdentityServer3.AccessTokenValidation;
using System.Configuration;

namespace Ambition.Web.App_Start
{
    public static class AuthConfig
    {
        public static void RegisterAuthConfiguration(this IAppBuilder app)
        {
            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = ConfigurationManager.AppSettings["Authority"]
            });
        }
    }
}