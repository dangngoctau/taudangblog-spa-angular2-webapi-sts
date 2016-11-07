using System;

namespace Ambition.Framework.Exceptions
{
    public class GeneralException: Exception
    {
        public GeneralException(string message, params object[] paramMessages): base(string.Format(message, paramMessages))
        {
        }
    }

}
