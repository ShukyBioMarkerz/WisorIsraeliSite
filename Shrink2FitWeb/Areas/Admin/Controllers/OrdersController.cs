using Shrink2FitDAL.BL;
using Shrink2FitDAL.VModels;
using Shrink2FitWeb.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Shrink2FitWeb.Areas.Admin.Controllers
{
    public class OrdersController : BaseController
    {
        //
        // GET: /Admin/Orders/

        public ActionResult Orders()
        {
            var model = OrderBL.GetAll();
            ViewBag.OrderStatus = OrderBL.GetAllStatus();
            ViewBag.DealTypes = OrderBL.GetAllDealtypes();
            ViewBag.RelationsTypes = OrderBL.GetAllBorrowerRelations();


            return View(model);
        }

        public ActionResult ObligationFutures(int id, int type)
        {
            try
            {
                var list = OrderBL.GetFutureObligations(id, (int)type);
                return View(list);
            }
            catch
            {
                return View("_error");
            }
        }

        public ActionResult Savings(int id)
        {
            try
            {
                var list = OrderBL.GetSavings(id);
                return View(list);
            }
            catch
            {
                return View("_error");
            }
        }

        public ActionResult ApprovingBanks(int id)
        {
            try
            {
                var list = BankBL.GetApprovingBanksForOrderID(id);
                return View(list);
            }
            catch
            {
                return View("_error");
            }
        }

        public ActionResult PropertyDetails(int id)
        {
            try
            {
                PropertyDetailsVM model = OrderBL.GetPropertyDetails(id);
                return View(model);
            }
            catch
            {
                return View("_error");
            }
        }


        public ActionResult ChangePrefernces(int id)
        {
            try
            {
                var list = OrderBL.GetChangePrefernces(id);
                return View(list);
            }
            catch
            {
                return View("_error");
            }
        }

    }
}
