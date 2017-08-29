using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class CompatibilityVM
    {
        public int LowestPossible {get;set;}
        public double LVT {get;set;}
        public double ReturnRatio { get; set; }
        public bool InRange { get; set; }
    
        public  int HighestPossible { get; set; }
        public  bool IsAgeAppropriate { get; set; }

        public int ReturnSum { get; set; }

        public int NumberOfBorrowers { get; set; }
    }
}
