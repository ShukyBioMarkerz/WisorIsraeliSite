using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class BankVM
    {
        public int ID { get; set; }
        public int BankNumber { get; set; }
        public string Name { get; set; }
        public bool PrimaryOption { get; set; }
        public bool Available { get; set; }
    }
}
