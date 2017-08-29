using Shrink2FitDAL.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Shrink2FitWeb.Areas.Admin.Controllers
{
    public class AccountController : Controller
    {
        //
        // GET: /Admin/Account/

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(FormCollection form)
        {
            try
            {
                var email = form["Email"];
                var password = form["password"];
                // shuky should remove
                email = "admin@shrink.com";
                password = "YaffaAmos1954!";
                var user = UserBL.GetUserByEmail(email);
		
                if (user.Password == password && user.Role == (int)Common.Roles.Admin)
                {
                    Session["role"] = user.Role;
                    FormsAuthentication.SetAuthCookie(user.Email + '~' + user.ID,true);
                    UserBL.UpdateLastLogin(user);
                    return Json(new { message = "ok" });
                }
                else
                {
                    return Json(new { message = "Incorrect password" });
                }
            }
            catch(Exception ex)
            {
                return Json(new { message = "Incorrect Email + " + ex.Message });
            }
        }

    }
}
