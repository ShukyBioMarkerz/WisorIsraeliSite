using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class ExcelEntry
    {
        public int ExecutionID { get; set; }
        public string OrderLabel { get; set; }
        public DateTime CreatedOn { get; set; }
        public List<ResultTrackVM> Options { get; set; }
    }
}
