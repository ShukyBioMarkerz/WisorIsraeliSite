using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
	public class MailTemplateVM
	{
		public int ID { get; set; }
		public string Subject { get; set; }
		public string Body { get; set; }
        public string MultiLine { get; set; }
	}
}
