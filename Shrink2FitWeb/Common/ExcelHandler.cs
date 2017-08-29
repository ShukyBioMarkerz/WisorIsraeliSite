using LinqToExcel;
using Shrink2FitDAL.BL;
using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Shrink2FitWeb.Common
{
    public static class ExcelHandler
    {

        public static void ProcessExcel(FileInfo file)
        {
            try
            {
                var excel = new ExcelQueryFactory(file.DirectoryName + '/' + file.Name);
                var entries = from c in excel.Worksheet("Results") select c;
                var result = new List<ExcelEntry>();
                List<string> info = new List<string>();
                foreach (var entry in entries)
                {
                    ExcelEntry excelEntry = new ExcelEntry
                    {
                        ExecutionID = int.Parse(entry.ElementAt(1).Value.ToString()),
                        OrderLabel = entry.ElementAt(2).ToString(),
                        CreatedOn = DateTime.Parse(entry.ElementAt(3).ToString()),
                        Options = new List<ResultTrackVM>()
                    };

                    info.Add(excelEntry.OrderLabel);

                    for (int i = 0; i < 3; i++)
                    {
                        int k = i * 7;
                        var track = new ResultTrackVM
                        {
                            TrackType = int.Parse(entry.ElementAt(4 + k).Value.ToString()),
                            Amount = int.Parse(entry.ElementAt(5 + k).Value.ToString()),
                            Inflation = entry.ElementAt(7 + k).Value.ToString() != "No",
                            Time = int.Parse(entry.ElementAt(6 + k).Value.ToString().TrimEnd('%')),
                            Rate = decimal.Parse(entry.ElementAt(8 + k).Value.ToString()) * 100,
                            PMT = int.Parse(entry.ElementAt(9 + k).Value.ToString()),
                            TotalPay = int.Parse(entry.ElementAt(10 + k).Value.ToString())
                        };
                        excelEntry.Options.Add(track);
                    }

                    result.Add(excelEntry);
                
                    
                    

                    
                }

                ResultsBL.ProcessEntries(result);

                Common.Mailing.PrepareMail(info.ToArray(), MailType.OrdersCalculated, null,true);
            }
            catch(Exception ex)
            {
                throw new Exception("Error processing file: " + ex.Message);
            }
        }
    }
}