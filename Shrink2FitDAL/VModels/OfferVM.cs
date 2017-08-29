using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class OfferVM
    {
        public string BankName { get; set; }
        public int BankIdentifier { get; set; }
        public int BankID { get; set; }
        public List<TrackVM> Tracks { get; set; }

		
    }

	
}
