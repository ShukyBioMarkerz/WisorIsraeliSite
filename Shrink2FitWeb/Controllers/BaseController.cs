using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.Web.Mvc;
using System.Web.Security;

namespace Shrink2FitWeb.Controllers
{
    public class BaseController : Controller
    {
		protected override void OnActionExecuting(ActionExecutingContext ctx)
		{
			//int role;
			//try
			//{
			//	role = int.Parse(Session["role"].ToString());
			//}
			//catch
			//{
			//	role = 0;
			//}

			if (!Request.IsAjaxRequest())
			{
				if (ctx.Controller.ToString() != "Account")
				{
					//if (role != (int)Common.Roles.Client || role != (int)Common.Roles.Admin)
					
					if (!User.Identity.IsAuthenticated)	
					{
						ctx.Result = RedirectToAction("Index", "home");
					}
					
				}
				else
				{
					ctx.Result = RedirectToAction("Index", "personal");
				}
				
			}


		}

	
    }
}
