using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class Error
    {
        public string Message { get; set; }
        public string Type { get; set; }
        public int Code { get; set; }
        public int Error_Subcode { get; set; }
    }
}
