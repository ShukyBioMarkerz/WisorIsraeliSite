using Shrink2FitDAL.BL;
using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Mvc;
using System.Web.Security;
using System.Net.Mail;
using System.Text;
using System.Web.Configuration;
using Microsoft.Ajax.Utilities;
using Shrink2FitWeb.Common;

namespace Shrink2FitWeb.Controllers
{
    public class AccountController : Controller
    {		
		[HttpPost]
		public ActionResult SignIn(FormCollection form)
		{
			try
			{
				var email = form["email"];
				var password = form["password"];				

				var user = UserBL.GetUserByEmail(email);

				if (user.Password == password)
				{					
					Session["role"] = user.Role;
					// added by Ehud
					Session["username"] = user.Name;
					Session["email"] = email;

					FormsAuthentication.SetAuthCookie(user.Email + '~' + user.ID + '~' + user.Name, true);
					UserBL.UpdateLastLogin(user);

				    Logger.SetUser(user.ID, user.Email);
					return Json(new { message = "ok", userId = user.ID, email = user.Email});
									
				}
				else
				{
					return Json(new { message = "Incorrect password" });
				}				
			}
			catch
			{
				return Json(new { message = "Incorrect Email" });
			}
		}


        [HttpPost]
        public ActionResult AcceptPayment(int orderId, decimal sum, string token, string Response)
        {
            try
            {
                if (token != "fj43gEGG2f")
                {
                    return Json("ok");
                }

                // if payment transaction approved
                if (Response != "000")
                {
                    return Json("ok");
                }

                if (OrderBL.SetInvoice(orderId, sum))
                {
                    OrderBL.ChangeOrderStatus(orderId, (int)OrderStatus.Paid);
                    var order = OrderBL.GetOrderByID(orderId);
                    string name = (User.Identity.Name.IsNullOrWhiteSpace() || User.Identity.Name.Split('~')[2] == null) ? "unknown" : User.Identity.Name.Split('~')[2];
                    int userid = order.UserID;
                    string[] info = { order.Label };
                    Mailing.PrepareMail(info, MailType.PaymentRecieved);
                    info = new string[] { name, order.Label, DateTime.Now.ToString("dd/MM/yyyy") };
                    Mailing.PrepareMail(info, Common.MailType.PaymentReciept, false, userid);
                    return Json(new { message = "ok" });
                }
            }
            catch (Exception ex)
            {
                Logger.SendInBackground(ex);
            }
            
            return Json(new { message = "fail" });
        }

		[HttpPost]
		public ActionResult RegisterNewUser(FormCollection form)
		{
			var email = form["Email"];
			var password = form["password"];
            var username = form["Email"].Split('@')[0];

            // check if the email is legit
            bool valid = Email.IsValidEmail(email);
            if (! valid)
            {
                return Json(new { message = "Email not legit" });
            }

            // TODO SEND MAIL TO ADMIN
            Mailing.PrepareMail(new string[] { username, email }, MailType.NewRegister);
            
            // check if email allready exist
            if (UserBL.GetUserByEmail(email) != null)
			{
				return Json(new { message = "Email exist" });
			}

			try
			{
				int id = UserBL.AddUser(email, password, username);
                // Mailing.PrepareMail(new string[] { username, email }, MailType.NewRegister);
                // send to the user as well
                Mailing.PrepareMail(new string[] { username, email }, MailType.NewRegister, null /* attachmentPath */, false /* isMultiLine */, email);
                FormsAuthentication.SetAuthCookie(email + '~' + id + '~' + username, true);
                Logger.SetUser(id, email);

                return Json(new { message = "ok", userId = id, email });
			}
			catch (Exception ex)
			{
                Logger.SendInBackground(ex);

				return Json(new { message = "false" });
			}
			
			return null;
		}

		[HttpPost]
		public ActionResult SendPassword(FormCollection form)
		{
			var email = form["Email"];

			if (UserBL.GetUserByEmail(email) == null)
			{
				return Json(new { message = "no" });
			}

			try
			{
				UserVM user = UserBL.GetUserByEmail(email);

				Mailing.PrepareMail(new string[] { user.Name, user.Password }, MailType.LostPassword,null, false, email);
                Mailing.PrepareMail(new string[] { user.ID.ToString() }, MailType.ClientRecoverPassword,null, false);

				return Json(new { message = "ok" });
			}
			catch (Exception ex)
			{
                Logger.SendInBackground(ex);
				return Json(new { message = ex.ToString() });
			}
		}

		[HttpPost]
		public bool IsUserAvialble(FormCollection form)
		{
			string newuser = form["value"];
			return	UserBL.CheckUserName(newuser);
		}

		[HttpPost]
		public ActionResult UpdateUserSettings(string fieldname, string value)
		{
			int userid = int.Parse(User.Identity.Name.Split('~')[1]);
			try
			{
                UserBL.UpdateField(userid, fieldname, value);				

				return Json(new { message = "ok" });
			}
			catch 
			{
				return Json(new { message = "fail" });
			}
		}
		[HttpPost]
		public ActionResult CheckCurrentPassword(string password)
		{
			var user = UserBL.GetUserByEmail(Session["email"].ToString());
			if (user.Password != password)
			{
				return Json(new { message = "fail" });
			}
			else
			{
				return Json(new { message = "ok" });
			}
		}

        [HttpPost]
        public ActionResult FacebookLogin(string accesstoken)
        {
            try
            {
                FaceBookHandler handler = new FaceBookHandler();
                var details = handler.Facebook(accesstoken);
                var user = UserBL.GetFacebookUser(details);
                Session["role"] = user.Role;
                // added by Ehud
                Session["username"] = user.Name;
                Session["email"] = user.Email;

                FormsAuthentication.SetAuthCookie(user.Email + '~' + user.ID + '~' + user.Name, true);
                UserBL.UpdateLastLogin(user);


                return Json(new { ok = true });
            }
            catch
            {
                return Json(new { ok = false});
            }
        }
		
    }
}
