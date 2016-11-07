using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Web;

namespace Ambition.Sts.Host.CertificateService
{
    public class CertificateHelper
    {
        public static X509Certificate2 GetDefaultCertificate()
        {
            try
            {
                var cert = new X509Certificate2(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"bin\Config\idsrv3test.pfx"), "idsrv3test");
                var name = string.IsNullOrEmpty(cert.FriendlyName) == false ? cert.FriendlyName : cert.Subject;
                Trace.TraceInformation("Default certificate found with name {0}", name);

                return cert;
            }
            catch (Exception ex)
            {
                Trace.TraceError("Error loading internal default certificate {0}", ex.Message);
            }

            return null;
        }

    }
}