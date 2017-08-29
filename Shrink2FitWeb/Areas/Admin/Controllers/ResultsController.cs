using Shrink2FitDAL.BL;
using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace Shrink2FitWeb.Areas.Admin.Controllers
{
    public class ResultsController : BaseController
    {
        //
        // GET: /Admin/Results/

        public ActionResult Results(string orderlabel)
        {
            ViewBag.OrderID = orderlabel;
            return View();
        }

        public ActionResult ResultList(string orderlabel)
        {
            try
            {
                List<ResultVM> model = ResultsBL.GetResultForOrder(orderlabel);
                Common.CalculateTotalPayment.CalculateSummations(model);
                return View(model);
            }
            catch
            {
                return View("_error");
            }
        }

        public ActionResult ProcessResultExcel()
        {
            try
            {
                var fileUpload = Request.Files[0];
                var extension = fileUpload.FileName.Split('.')[1];
                var uploadPath = Server.MapPath("~/ResultUploads");
                var name = "Result_" + DateTime.Now.Day + "_" + DateTime.Now.Month + "_" + DateTime.Now.Year + '_' + DateTime.Now.Hour + '_' + DateTime.Now.Minute + '.' + extension;
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }
                using (var fs = new FileStream(Path.Combine(uploadPath, name),FileMode.Create))
                {
                    var buffer = new byte[fileUpload.InputStream.Length];
                    fileUpload.InputStream.Read(buffer, 0, buffer.Length);
                    fs.Write(buffer, 0, buffer.Length);
                }
                FileInfo fi = new FileInfo(Path.Combine(uploadPath, name));
                Common.ExcelHandler.ProcessExcel(fi);
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                return Json(new { success = false, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
