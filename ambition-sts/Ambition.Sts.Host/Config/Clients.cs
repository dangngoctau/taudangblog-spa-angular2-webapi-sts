using IdentityServer3.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ambition.Sts.Host.Config
{
    public static class Clients
    {
        public static IEnumerable<Client> Get()
        {
            return new[]
            {
            new Client
            {
                Enabled = true,
                ClientName = "JS Client",
                ClientId = "js",
                Flow = Flows.Implicit,
                RequireConsent = false,
                IdentityTokenLifetime = 60,
                AccessTokenLifetime = 60,
                RedirectUris = new List<string>
                {
                    "http://localhost:5555/oauth_callback",
                    "http://localhost:5555/silent-renew.html",
                    "https://masterdotnetspa-fontend.azurewebsites.net/oauth_callback",
                    "https://masterdotnetspa-fontend.azurewebsites.net/silent-renew.html",
                },
                AllowedCorsOrigins = new List<string>
                {
                    "http://localhost:5555",
                    "https://masterdotnetspa-fontend.azurewebsites.net"
                },

                AllowAccessToAllScopes = true
            }
        };
        }
    }
}