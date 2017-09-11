using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using Newtonsoft.Json;
using Shrink2FitDAL.BL;
using Shrink2FitDAL.VModels;
using CheckAmountWithPMTV3;
using Shrink2FitWeb.Common;
using FastThreeOptionSearchV3_2_1;

namespace Shrink2FitWeb.Controllers
{
    public class OrderController : Controller
    {
        //
        // GET: /Order/
		[HttpPost]
        public ActionResult GetOrder(OrderDataContainer Data)
        {

            try
            {
                SearchResult fastSearchResult;
                var order = OrderBL.ProcessOrder(Data, out fastSearchResult);
                var lable = order.Label;
               // var name = UserBL.GetUserName(Data.Userid);
                string name = "";
                try
                {
                    name = User.Identity.Name.Split('~')[2];
                }
                catch
                {
                    name = "unknown";
                }
                int userid = int.Parse(User.Identity.Name.Split('~')[1]);
                string[] info = { name, lable, DateTime.Now.ToString("dd/MM/yyyy") };

                //Send mail with label and user name to admin
                Common.Mailing.PrepareMail(info,Common.MailType.NewOrder, fastSearchResult.ResultFilePath);

                if (CheckForPreviousPayments(userid))
                {
                    // set inovoice with amount 0
                    OrderBL.SetInvoice(order.ID, 0);
                    // chance status to paid
                    OrderBL.ChangeOrderStatus(order.ID, (int)OrderStatus.Paid);

                    // send email to user 
                    Common.Mailing.PrepareMail(info, Common.MailType.NewOrderWithNoPayment, false, userid);
                }
                else
                {
                    Common.Mailing.PrepareMail(info, Common.MailType.NewOrderUser, false, userid);
                }

                return Json(new { result = true, label = lable });
            }
            catch(Exception ex)
            {
                Logger.SendInBackground(ex);
                return Json(new { result = false, message = ex.Message}); 
            }
        }

        public bool CheckForPreviousPayments(int userid)
        {
            var isPaymentAvailable = System.Configuration.ConfigurationManager.AppSettings["IsPaymentAvailable"];
            if (isPaymentAvailable == "False")
            {
                return false; // true; avoid sending NewOrderWithNoPayment email since it crashes the system because of Date parameters which should be consider... 
            }
            
            var invoices = OrderBL.GetInvoicesForUser(userid);
            foreach (var invoice in invoices)
            {
                var timeFromPay = DateTime.Now.Date - invoice.CreatedOn; 

                // Check if there is some invoice with payment and in the last 2 weeks
                if ((invoice.Amount != null && invoice.Amount != 0) && timeFromPay.TotalDays < 14)
                {
                    return true;
                }
            }   
            return false;
        }

		[HttpPost]
		public ActionResult GetOrderLabel(int userId, int dealType)
		{
			string Label = OrderBL.GetLabel(userId, dealType);
            string DealName = OrderBL.getDealTypeName(dealType);
			if (Label != null)
			{
				return Json(new { result = true, Label = Label, dealName =  DealName});
			}
			else
			{
				return null;
			}
		}

		[HttpPost]
		public ActionResult AddBank(string bankName)
		{
			try
			{
				// all banks xml http://www.boi.org.il/he/BankingSupervision/BanksAndBranchLocations/Lists/BoiBankBranchesDocs/snifim_he.xml
				//TEMP!
				int bankId = 666;
				
				return Json(new { result = true, bankid = bankId });
			}
			catch (Exception ex)
			{
                Logger.SendInBackground(ex);
				return Json(new { result = false });
			}
		}

        public ActionResult CheckCompatibility(int property,int sum, int monthlyReturn, int income, int age , int numOfBorrowers)
        {
            try
            {
                double LTV = (double)sum / (double)property;
                double returnRatio = (double)monthlyReturn / (double)income;
                bool flag = true; //  false;
                
                // flag = LTV > 0.7 || returnRatio > 0.3;

                Result check =  CheckAmountWithPMTV3.Program.Check((double)sum, (double)monthlyReturn, (uint)age, (uint) income, (uint) property);
                var model = new CompatibilityVM
                {
                    LVT = LTV,
                    ReturnRatio = returnRatio,
                    InRange = check.ttlPmtInRange,
                    HighestPossible = check.minTimeTtlPmtPossible,
                    LowestPossible = check.maxTimeTtlPmtPossible,
                    IsAgeAppropriate = !check.ageRestriction,
                    ReturnSum = monthlyReturn,
                    NumberOfBorrowers = numOfBorrowers
                };
                bool isFlagged = flag || !check.ttlPmtInRange;
                return Json(new { result = true, warning = isFlagged, message = Common.Helpers.RenderViewToString(this.ControllerContext, "Compatibility", model) });

            }
            catch (Exception ex)
            {
                Logger.SendInBackground(ex);
                return Json(new { result = false, message = Url.Action("ServerError") });
            }
        }

    }
}
