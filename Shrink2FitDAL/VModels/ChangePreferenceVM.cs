using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class ChangePreferenceVM
    {
        public string Type { get; set; }
        public int? Time { get; set; }
        public int? newPayment { get; set; }
    }
}
