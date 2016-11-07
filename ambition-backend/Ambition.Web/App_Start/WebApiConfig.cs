using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Ambition.Web
{
    public static class WebApiConfig
    {
        public static void RegisterWebApiConfiguration(this HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            // JSON formatter
            config.Formatters.Remove(config.Formatters.JsonFormatter);
            config.Formatters.Add(new JsonMediaTypeFormatter());

            var jsonSerializerSettings = config.Formatters.JsonFormatter.SerializerSettings;
            jsonSerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
            jsonSerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            jsonSerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            jsonSerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.None;
        }
    }
}
