using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class ResultTrackVM
    {
        public int ID { get; set; }
        public int ResultID { get; set; }
        public int Amount { get; set; }
        public int TrackType { get; set; }
        public string TrackName { get; set; }
        public int Time { get; set; }
        public bool Inflation { get; set; }
        public decimal Rate { get; set; }
        public int PMT { get; set; }
        public int TotalPay { get; set; }
        public TrackSumResult Summation { get; set; }

    }
}
