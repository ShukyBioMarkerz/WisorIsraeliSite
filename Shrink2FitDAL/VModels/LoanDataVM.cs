using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class LoanDataVM
    {
        public int ID { get; set; }
        public string OrderLabel { get; set; }
        public DateTime CreatedOn { get; set; }
        public int YoungestLoanerAge { get; set; }
        public int TotalNetIncome { get; set; }
        public int PropertyValue { get; set; }
        public int DesiredLoanAmount { get; set; }
        public int DesiredMonthlyPayment { get; set; }
        public int NewPredictedPayment { get; set; }
        public int AmountSaved { get; set; }
        public int Liquidity { get; set; }
        public int SavingsType { get; set; }
        public int Yield { get; set; }
        //public List<ResultTrackVM> Options { get; set; }
    }
}
