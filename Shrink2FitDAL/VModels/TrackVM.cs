using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Shrink2FitDAL.VModels
{
    public class TrackVM
    {
        public int ID { get; set; }
        public int OfferOrCheckID { get; set; }
        public Nullable<int> YearTaken { get; set; }
        public Nullable<int> MonthTaken { get; set; }
        public int Amount { get; set; }
        public int TrackType { get; set; }
        public string TrackTypeName { get; set; }
        public int Time { get; set; }
        public bool Inflation { get; set; }
        public Nullable<decimal> Rate { get; set; }
        public Nullable<int> PMT { get; set; }
		public TrackSumResult Summation { get; set; }

    }
}
