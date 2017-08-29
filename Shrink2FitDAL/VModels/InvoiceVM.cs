using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
	public class InvoiceVM
	{
		public int ID { get; set; }
		public int OrderID { get; set; }
		public bool IsBilling { get; set; }
        public string Label { get; set; }
        public string DealType { get; set; }
		public System.DateTime CreatedOn { get; set; }
        public DateTime OrderCreation { get; set; }
		public Nullable<decimal> Amount { get; set; }
		public int NumberOfPayments { get; set; }
		public int CurrencyID { get; set; }
		public string Link { get; set; }
	}
}
