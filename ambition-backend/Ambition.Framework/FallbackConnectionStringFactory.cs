using System.Configuration;
using System.Data.Common;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;

namespace Ambition.Framework
{
    /// <summary>
    /// Connection string factory who uses a predefined fallback connection string name if requested connection string name is not available
    /// </summary>
    public class FallbackConnectionStringFactory : IDbConnectionFactory
    {
        private readonly ConnectionStringSettings _fallbackConnectionSettings;

        public FallbackConnectionStringFactory(string fallbackConnectionStringName)
        {
            var fallbackConnectionSettings = ConfigurationManager.ConnectionStrings[fallbackConnectionStringName];
            if (fallbackConnectionSettings == null)
            {
                throw new ConfigurationErrorsException(string.Format("There is no connection string matching fallback name {0}", fallbackConnectionStringName));
            }

            _fallbackConnectionSettings = fallbackConnectionSettings;
        }

        /// <summary>
        /// Creates a connection based on the given connection string name.
        /// </summary>
        /// <param name="nameOrConnectionString">The connection string name.</param>
        /// <returns>
        /// An initialized DbConnection. 
        /// </returns>
        public DbConnection CreateConnection(string nameOrConnectionString)
        {
            // find requested connection string
            var requestedConnectionSetting = ConfigurationManager.ConnectionStrings[nameOrConnectionString];

            if (requestedConnectionSetting != null)
            {
                // use requested connection
                var requestedConnectionString = requestedConnectionSetting.ConnectionString;
                var requestedConnection = new SqlConnection(requestedConnectionString);

                return requestedConnection;
            }
            else
            {
                // use fallback connection
                var defaultConnectionString = _fallbackConnectionSettings.ConnectionString;
                var defaultConnection = new SqlConnection(defaultConnectionString);

                return defaultConnection;
            }
        }
    }
}