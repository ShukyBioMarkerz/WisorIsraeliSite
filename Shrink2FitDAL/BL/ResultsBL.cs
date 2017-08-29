using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.BL
{
    public class ResultsBL
    {
        public static List<ResultVM> GetResultForOrder(string orderlabel)
        {
            try
            {
                var result = new List<ResultVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var order = context.Orders.Single(o => o.Label == orderlabel);
                    foreach (var entry in order.ResultEntries)
                    {
                        var toAdd = new ResultVM
                        {
                            ExecutionID = entry.ExecutionID,
                            OrderLabel = entry.Order.Label,
                            CreatedOn = (DateTime)entry.CreatedOn,
                            Options = new List<ResultTrackVM>()
                        };

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

        public static void ProcessEntries(List<ExcelEntry> results)
		{			
			try
			{
				using (Shrink2FitEntities context = new Shrink2FitEntities())
				{
                    foreach (var entry in results)
                    {
                        var order = context.Orders.Single(o => o.Label == entry.OrderLabel);
                        ResultEntry result = new ResultEntry
                        {
                            OrderID = order.ID,
                            ExecutionID = entry.ExecutionID,
                            CreatedOn = entry.CreatedOn

                        };

                        foreach (var track in entry.Options)
					{ 
                            result.ResultTracks.Add(new ResultTrack
						{
                                Amount = track.Amount,
                                Inflation = track.Inflation,
                                PMT = track.PMT,
                                TrackType = track.TrackType,
                                Rate = track.Rate,
                                Time = track.Time,
                                TotalPay = track.TotalPay
                            });
                        }
                        order.Status = 4;
                        context.Entry(order).State = System.Data.EntityState.Modified;
                        context.ResultEntries.Add(result);
					}

                    context.SaveChanges();
				}
			}
			catch(Exception ex)
			{
                throw new Exception("Could not enter entries into DB: " + ex.Message);
			}
		}
    }
}
