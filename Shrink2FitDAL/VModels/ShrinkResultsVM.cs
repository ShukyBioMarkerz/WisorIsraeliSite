using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
	// for כמה חסכתי Partial View
	public class ShrinkResultsVM
	{
		public List<OfferVM> UserOffers { get; set; }
		public List<ResultTrackVM> ShrinkResults { get; set; }
	}


}
