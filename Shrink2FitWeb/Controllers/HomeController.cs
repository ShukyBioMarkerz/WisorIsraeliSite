using Shrink2FitDAL;
using Shrink2FitDAL.BL;
using Shrink2FitWeb.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mindscape.Raygun4Net;

namespace Shrink2FitWeb.Controllers
{
	public class HomeController : Controller
    {
        //
        // GET: /Home/
        
        public ActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "personal");
            }
			ViewBag.CurrentPage = "index";
            return View();
        }

		public ActionResult About()
		{
			ViewBag.CurrentPage = "about";
			return View();
		}

		public ActionResult TOS()
		{
			ViewBag.CurrentPage = "tos";
			return View();
		}

        public ActionResult Privacy()
        {
            ViewBag.CurrentPage = "Privacy";
            return View();
        }

		[HttpGet]
		public ActionResult GetSignIn(bool isRegister)
		{
            ViewBag.IsRegister = isRegister;
			return PartialView("SignIn");
		}

		[HttpGet]
		public ActionResult Contact()
		{
			return PartialView("Contact");
		}

        public ActionResult RecieveMessage(Email email)
        {
            try
            {
                string[] mail = { email.Name, email.EmailAddress, email.Subject, email.Message};
                Mailing.PrepareMail(mail, MailType.UserMessage);
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                Logger.SendInBackground(ex);
                return Json(new { success = false });
            }
        }

		[HttpGet]
        public ActionResult Payment(string OrderId)
		{
		    try
		    {
                string reportPrice = System.Configuration.ConfigurationManager.AppSettings["ReportPrice"];

                int orderId = int.Parse(OrderId);
                var order = OrderBL.GetOrderByID(orderId);
                var user = UserBL.GetUserByID(order.UserID);

                ViewBag.PaymentIframeUrl = string.Format("https://direct.tranzila.com/ttxwisor/iframe.php?template=custom&lang=il&currency=1&sum={0}&orderId={1}&email={2}",
                    reportPrice, OrderId, user.Email);
		    }
		    catch (Exception ex)
		    {
                Logger.SendInBackground(ex);
		    }

			return PartialView("Payment");
		}

		[HttpGet]
		public ActionResult Calculate()
		{
			return PartialView("Calculate");
		}
		
    }
}
