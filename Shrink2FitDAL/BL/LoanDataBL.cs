using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.BL
{
    public class LoanDataBL
    {
        public static List<LoanDataVM> GetResultForOrder(string orderlabel)
        {
            try
            {
                var result = new List<LoanDataVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    //var order = context.Orders.Single(o => o.Label == orderlabel);
                    int orderid = context.Orders.Single(o => o.Label.ToLower() == orderlabel.ToLower()).ID;
                    var offers = context.OffersOrChecks.Where(oc => oc.OrderID == orderid && oc.Type == 1).GroupBy(oc => oc.ApprovingBank);

                    foreach (var entry in order.ResultEntries)
                    {
                        var toAdd = new LoanDataVM
                        {
                            ID = entry.ExecutionID,
                            OrderLabel = entry.Order.Label,
                            CreatedOn = (DateTime)entry.CreatedOn,
                            YoungestLoanerAge = entry.Order.YoungestLoanerAge,
                            TotalNetIncome = entry.Order.TotalNetIncome,
                            PropertyValue = entry.Order.PropertyValue,
                            DesiredLoanAmount = entry.Order.DesiredLoanAmount,
                            DesiredMonthlyPayment = entry.Order.DesiredMonthlyPayment
                            //, Options = new List<ResultTrackVM>()
                        };

                        NewPredictedPayment = entry.Order.NewPredictedPayment,
                            DesiredLoanAmount = entry.Order.DesiredLoanAmount,
      
                        foreach (var track in entry.ResultTracks)
                        {
                            toAdd.Options.Add(new ResultTrackVM
                            {
                                Amount = track.Amount,
                                ID = track.ID,
                                Inflation = track.Inflation,
                                PMT = track.PMT,
                                Rate = track.Rate,
                                Time = track.Time,
                                TotalPay = track.TotalPay,
                                TrackType = track.TrackType,
                                TrackName = track.ListedTrack.Name
                            });

                        }

                        result.Add(toAdd);
                    }
                }
                return result;
            }
            catch
            {
                throw new Exception("Could not retrieve results list");
            }
        }

    }
}
