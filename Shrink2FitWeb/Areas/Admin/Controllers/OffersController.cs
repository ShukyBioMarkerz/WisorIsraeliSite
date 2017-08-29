using Shrink2FitDAL.BL;
using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Shrink2FitWeb.Areas.Admin.Controllers
{
    public class OffersController : BaseController
    {
        //
        // GET: /Admin/Offers/

        public ActionResult Offers(string orderlabel)
        {



            ViewBag.OrderID = orderlabel;
            
            return View();
        }

        public ActionResult OffersList(string orderlabel, int type = 1)
        {
            try
            {
                List<OfferVM> model = new List<OfferVM>();
                if (type == 1)
                {
                    model = OfferOrCheckBL.GetOfferingBanksForOrder(orderlabel);
                }
                else
                {
                    model = OfferOrCheckBL.GetRefinanceCheck(orderlabel);
                }
                ViewBag.Type = type;
                return View(model);
            }
            catch
            {
                return View("_error");
            }
        }

    }
}
