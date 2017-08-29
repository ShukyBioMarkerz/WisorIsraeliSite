using Shrink2FitDAL.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Shrink2FitWeb.Areas.Admin.Controllers
{
    public class UsersController : BaseController
    {
        //
        // GET: /Admin/Users/

        public ActionResult Users()
        {
            var model = UserBL.GetAll();
            ViewBag.AllStatus = UserBL.GetAllStatus();
            return View(model);
        }

        public ActionResult UpdateField(string field, string value)
        {
            try
            {
                int id = int.Parse(field.Split('_')[0]);
                string fieldName = field.Split('_')[1];
                UserBL.UpdateField(id, fieldName, value);
                
                return Json(new { result = "ok" });
               
            }
            catch
            {
                return Json(new { result = "failed" });
            }
        }

        public ActionResult ChangeStatus(int ID, int status)
        {
            try
            {
                UserBL.ChangeStatus(ID, status);
                return Json(new { result = "ok" });
            }
            catch
            {
                return Json(new { result = "failed" });
            }
        }

        public ActionResult AddUser(string email, string password)
        {
            try
            {
                if (UserBL.GetUserByEmail(email) != null)
                {
                    return Json(new { ok = false, message = "email already in system" });
                }
                UserBL.AddUser(email, password);
                return Json(new { ok = true });
            }
            catch
            {
                return Json(new { ok = false, message = "unable to add user" });
            }
        }

    }
}
