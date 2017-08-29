using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class AmountSavedVM
    {
        public List<OfferVM> Offers { get; set; }
        public List<ResultVM> Results { get; set; }
        public string Label { get; set; }
        public int InitialSavings { get; set; }

    }
}
