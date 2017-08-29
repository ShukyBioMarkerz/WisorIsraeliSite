using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Shrink2FitWeb.Areas.Admin.Controllers
{
    public class BaseController : Controller
    {
        //
        // GET: /Base/

        protected override void OnActionExecuting(ActionExecutingContext ctx)
        {
            int role;
            try
            {
                role = int.Parse(Session["role"].ToString());
            }
            catch
            {
                role = 0;
            }

            if (!Request.IsAjaxRequest())
            {
                if (ctx.Controller.ToString() != "Account")
                {
                    if (role != (int)Common.Roles.Admin)
                    {
                        ctx.Result = RedirectToAction("login","account");
                    }
                }
            }


        }

    }
}
