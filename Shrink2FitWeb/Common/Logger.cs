using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Mindscape.Raygun4Net;
using Mindscape.Raygun4Net.Messages;

namespace Shrink2FitWeb.Common
{
    public class Logger
    {
        private static readonly RaygunClient raygunClient = new RaygunClient();

        public static void SendInBackground(Exception ex)
        {
            raygunClient.SendInBackground(ex);
        }

        public static void SetUser(int userId , string email)
        {
            raygunClient.UserInfo = new RaygunIdentifierMessage(email)
            {
                Identifier = userId.ToString(),
                IsAnonymous = false,
                Email = email

            };
        }
    }
}