using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class ObligationFutureVM
    {
        public int ID { get; set; }
        public int OrderID { get; set; }
        public int Type { get; set; }
        public int Amount { get; set; }
        public int EndYear { get; set; }
        public int EndMonth { get; set; }
    }
}
