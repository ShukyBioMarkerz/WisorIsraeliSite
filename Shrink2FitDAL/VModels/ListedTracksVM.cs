using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
	public class ListedTracksVM
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public bool Inflated { get; set; }
		public int MinTimeMonths { get; set; }
		public int MaxTimeMonths { get; set; }
		public int JumpsInMonths { get; set; }
	}
}
