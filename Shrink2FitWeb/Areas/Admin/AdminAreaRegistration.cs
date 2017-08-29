using System.Web.Mvc;

namespace Shrink2FitWeb.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Admin_default",
                "Admin/{controller}/{action}/{id}",
                new { controller = "admin/Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "Shrink2FitWeb.Areas.Admin.Controllers" }
            );
        }
    }
}
