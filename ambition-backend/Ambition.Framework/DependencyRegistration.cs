using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Reflection;
using Ambition.Framework.EntityFramework;
using Autofac;
using Newtonsoft.Json;

namespace Ambition.Framework
{
    public static class DependencyRegistration
    {
        public static IContainer GetDependencies()
        {
            var builder = new ContainerBuilder();

            // Register singletone instances.
            builder.RegisterGeneric(typeof(DbContextFactory<>)).As(typeof(IDbContextFactory<>)).SingleInstance();

            var modules = LoadModules();

            foreach (var module in modules)
            {
                // Register Services.
                var np = module.Item2.Namespace;
                var services = module.Item1.DefinedTypes.Where(c => c.IsPublic && c.IsClass && c.Namespace == np + ".Services");
                foreach (var service in services)
                {
                    var serviceName = service.Name;
                    var defaultImplementedInterface = service.ImplementedInterfaces.First(c => c.Name == "I" + serviceName);
                    builder.RegisterType(service.UnderlyingSystemType).As(defaultImplementedInterface);
                }

                // Register Controllers.
                var controllers = module.Item1.DefinedTypes.Where(c => c.Namespace == np + ".Controllers" && c.UnderlyingSystemType.BaseType.Name == "ApiController");
                foreach (var controller in controllers)
                {
                    builder.RegisterType(controller.UnderlyingSystemType);
                }
            }

            return builder.Build();
        }

        private static ICollection<Tuple<Assembly, ModuleInformation>> LoadModules()
        {
            string baseModulePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "bin\\Modules");
            var modulePaths = Directory.GetDirectories(baseModulePath);

            ICollection<Tuple<Assembly, ModuleInformation>> modules = new Collection<Tuple<Assembly, ModuleInformation>>();

            foreach (var modulePath in modulePaths)
            {
                var moduleInfo = GetModuleInfo(modulePath);
                var assembly = Assembly.LoadFile(Path.Combine(modulePath, moduleInfo.AssemblyName + ".dll"));
                modules.Add(new Tuple<Assembly, ModuleInformation>(assembly, moduleInfo));
            }

            return modules;
        }

        private static ModuleInformation GetModuleInfo(string modulePath)
        {
            var moduleInfo = File.ReadAllText(Path.Combine(modulePath, "module.json"));

            return JsonConvert.DeserializeObject<ModuleInformation>(moduleInfo);
        }
    }
}
