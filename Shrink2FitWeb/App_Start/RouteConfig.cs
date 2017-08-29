using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Shrink2FitWeb
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            AreaRegistration.RegisterAllAreas();

            routes.MapRoute(
                name: "TOS",
                url: "TOS",
                defaults: new { controller = "Home", action = "TOS", id = UrlParameter.Optional },
                namespaces: new[] { "Shrink2FitWeb.Controllers" }
            );

            routes.MapRoute(
                name: "Privacy",
                url: "Privacy",
                defaults: new { controller = "Home", action = "Privacy", id = UrlParameter.Optional },
                namespaces: new[] { "Shrink2FitWeb.Controllers" }
            );
            
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] {"Shrink2FitWeb.Controllers"}
            );
        }
    }
}