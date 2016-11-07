using IdentityServer3.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Ambition.Sts.Host.Config
{
    public static class Scopes
    {
        public static List<Scope> Get()
        {
            return new List<Scope>
        {
            StandardScopes.OpenId,
            StandardScopes.Profile
        };
        }
    }
}