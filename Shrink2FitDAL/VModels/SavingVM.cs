using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class SavingVM
    {
        public int ID { get; set; }
        public int OrderID { get; set; }
        public int AmountSaved { get; set; }
        public string SavingsType { get; set; }
        public decimal Yield { get; set; }
        public bool? Liquidity { get; set; }
    }
}
