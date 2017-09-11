using Shrink2FitDAL.BL;
using Shrink2FitDAL.VModels;
using Shrink2FitWeb.Common;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Shrink2FitWeb.Controllers
{
	public class PersonalController : BaseController
	{
		//
		// GET: /Personal/

		public ActionResult Index()
		{
			// get last entrance
			int user = int.Parse(User.Identity.Name.Split('~')[1]);
			string d = UserBL.GetLastEntrance(user);
            string name = "";
            try
            {
                name = User.Identity.Name.Split('~')[2];
            }
            catch
            {
                name = "unknown";
            }
            string[] dd = { name };
            if (null != d)
			    dd = d.Split(' ');
			ViewBag.lastEntrance = dd[0];

			ViewBag.CurrentPage = "index";
			ViewBag.UserName = name;

			ViewBag.CurrentTab = "index";

			var model = BankBL.GetAllBanks();

			var ListedTracks = OrderBL.GetAllListedTracks();

			ViewBag.ListedTracks = ListedTracks;

			ViewBag.RelationshipTypes = UserBL.GetAllRelationships();

			ViewBag.SavingsTypes = OrderBL.GetSavingsTypes();

			GetName();

			ViewBag.CurrentTab = "NewOrder";

			return View("NewOrder", model);

			//return View();
		}

		public ActionResult NewOrder()
		{
			string d = UserBL.GetLastEntrance(int.Parse(User.Identity.Name.Split('~')[1]));
            string[] dd = { "" };
            if (null != d)
                dd = d.Split(' ');
            
			ViewBag.lastEntrance = dd[0];

			var model = BankBL.GetAllBanks();

			var ListedTracks = OrderBL.GetAllListedTracks();

			ViewBag.ListedTracks = ListedTracks;

			ViewBag.RelationshipTypes = UserBL.GetAllRelationships();

			ViewBag.SavingsTypes = OrderBL.GetSavingsTypes();

			GetName();

			ViewBag.CurrentTab = "NewOrder";

			return View("NewOrder", model);
		}


		public ActionResult Profit()
		{
			string d = UserBL.GetLastEntrance(int.Parse(User.Identity.Name.Split('~')[1]));
            string[] dd = { "" };
            if (null != d)
                dd = d.Split(' ');
            ViewBag.lastEntrance = dd[0];
			// get all user orders and all orders tracks

			var model = OrderBL.GetAllUserOrders(int.Parse(User.Identity.Name.Split('~')[1]));

            foreach (var entry in model)
            {
                if (entry.BankOffers)
                {
                    var offers = OfferOrCheckBL.GetOfferingBanksForOrder(entry.Label);
                    if (offers.Count > 0)
                    {
                        Common.CalculateTotalPayment.CalculateSummations(offers);
                        int minOffer = (int)offers.Min(o => o.Tracks.Sum(t => t.Summation.TotalPay));
                        entry.OffersTotal = minOffer;
                    }
                }
            }

			GetName();

			ViewBag.CurrentTab = "Profit";

			return View("Profit", model);
		}


		public ActionResult Orders()
		{
			string d = UserBL.GetLastEntrance(int.Parse(User.Identity.Name.Split('~')[1]));
            string[] dd = { "" };
            if (null != d)
                dd = d.Split(' ');
            ViewBag.lastEntrance = dd[0];

			var model = OrderBL.GetAllUserOrders(int.Parse(User.Identity.Name.Split('~')[1]));

			GetName();

			ViewBag.CurrentTab = "Orders";

			return View("Orders", model);
		}


		public ActionResult Payments()
		{
			string d = UserBL.GetLastEntrance(int.Parse(User.Identity.Name.Split('~')[1]));
            string[] dd = { "" };
            if (null != d)
                dd = d.Split(' ');
            ViewBag.lastEntrance = dd[0];

            var model = OrderBL.GetInvoicesForUser(int.Parse(User.Identity.Name.Split('~')[1]));

            GetName();

			ViewBag.CurrentTab = "Payments";

			return View("Payments", model);
		}

	    public ActionResult PaymentCompleted(){

            try
            {
                int userId = int.Parse(User.Identity.Name.Split('~')[1]);
                var email = User.Identity.Name.Split('~')[0];

                ViewBag.userId = userId;
                ViewBag.email = email;
            }
            catch (Exception ex)
            {
                Logger.SendInBackground(ex);
            }

            return View("PaymentCompleted");

	    }


        public ActionResult PaymentRejected()
        {
            try
            {
                int userId = int.Parse(User.Identity.Name.Split('~')[1]);
                var email = User.Identity.Name.Split('~')[0];

                ViewBag.userId = userId;
                ViewBag.email = email;
            }
            catch (Exception ex)
            {
                Logger.SendInBackground(ex);
            }

            return View("PaymentRejected");
        }

        // Just for test
        public ActionResult iframe()
        {
            return View("iframe");
        }

		public ActionResult Settings()
		{
			string d = UserBL.GetLastEntrance(int.Parse(User.Identity.Name.Split('~')[1]));
            string[] dd = { "" };
            if (null != d)
                dd = d.Split(' ');
            ViewBag.lastEntrance = dd[0];

			// get user details
			UserVM currentuser = UserBL.GetUserByID(int.Parse(User.Identity.Name.Split('~')[1]));
			ViewBag.CreationDate = currentuser.CreatedOn.ToShortDateString().ToString();
			ViewBag.MainEmail = User.Identity.Name.Split('~')[0];
			ViewBag.UserName = currentuser.Name;

			if (currentuser.SecondaryEmail != null)
			{
				ViewBag.SecondaryEmail = currentuser.SecondaryEmail.ToString();
			}
			else
			{
				ViewBag.SecondaryEmail = "";
			}

			return View("Settings");
		}

		[HttpPost]
		public ActionResult GetOrderTracks(string orderLabel, int orderId)
		{
			AmountSavedVM model = new AmountSavedVM();

			model.Offers = OfferOrCheckBL.GetOfferingBanksForOrder(orderLabel);
			model.Results = ResultsBL.GetResultForOrder(orderLabel);
            model.Label = orderLabel;
			ViewBag.HasOffers = model.Offers.Count > 0;
			ViewBag.HasResults = model.Results.Count > 0;



			if (model.Results.Count > 0)
			{
				Common.CalculateTotalPayment.CalculateSummations(model.Results);
			}

			if (model.Offers.Count > 0)
			{
				Common.CalculateTotalPayment.CalculateSummations(model.Offers);
			}

			var initialCalc = OrderBL.GetInitialCalculation(orderId);

			if (model.Offers.Count != 0)
			{
				int minOffer = (int)model.Offers.Min(o => o.Tracks.Sum(t => t.Summation.TotalPay));

				if (minOffer <= initialCalc)
				{
					model.InitialSavings = initialCalc;
					ViewBag.Save = false;
				}
				else
				{
					model.InitialSavings = minOffer - initialCalc;
					ViewBag.Save = true;
				}
			}
			else
			{
				model.InitialSavings = initialCalc;
				ViewBag.Save = false;
			}
            
            if (OrderBL.CheckForInvoice(orderId))
			{
				ViewBag.WasPaid = true;
			}
			else
			{
				ViewBag.WasPaid = false;
			}
            // Since we don't support payment now, avoid displaying the payment announcment
            // TBD - ugly but that's life... since we don't have the lastest backend code to compare to
            ViewBag.WasPaid = true;

            ViewBag.CurrentOrderId = orderId;

			return PartialView("GetOrderTracks", model);
		}

        /*
		[HttpPost]
		public ActionResult SendInvoice(int OrderId)
		{
			if (OrderBL.SetInvoice(OrderId))
			{
                OrderBL.ChangeOrderStatus(OrderId, (int)OrderStatus.Paid);
				var order = OrderBL.GetOrderByID(OrderId);
				//var name = UserBL.GetUserName(order.UserID);
                string name = User.Identity.Name.Split('~')[2] == null ? "unknown" : User.Identity.Name.Split('~')[2];
                int userid = int.Parse(User.Identity.Name.Split('~')[1]);
				string[] info = { order.Label };
				Common.Mailing.PrepareMail(info, MailType.PaymentRecieved);
                info = new string[] { name, order.Label, DateTime.Now.ToString("dd/MM/yyyy") };
                Common.Mailing.PrepareMail(info, Common.MailType.PaymentReciept, false, userid);
				return Json(new { message = "ok" });

			}
			else
			{
				return Json(new { message = "fail" });
			}
		}
        */

		[HttpPost]
		public ActionResult GetUserID()
		{
			int currentuser = int.Parse(User.Identity.Name.Split('~')[1]); 
			return Json(new { id = currentuser });
		}

		[HttpPost]
		public ActionResult GetCalculate(string Label)
		{
			// TODO
			// send mail to admin
			return null;
		}

		public ActionResult LogOut()
		{
			FormsAuthentication.SignOut();

			return RedirectToAction("Index", "home");
		}

		private void GetName()
		{
			int user = int.Parse(User.Identity.Name.Split('~')[1]);

			//string name = UserBL.GetUserName(user);
            string name = "";
            try
            {
                name = User.Identity.Name.Split('~')[2];
            }
            catch
            {
                name = "unknown";
            }


			ViewBag.UserName = name;
		}
	}
}
