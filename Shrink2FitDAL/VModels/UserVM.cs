using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class UserVM
    {
        public int ID { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        
		// added by Ehud
		public string Name { get; set; }
        public string SecondaryEmail { get; set; }
        public System.DateTime? LastLogin { get; set; }
        public int Status { get; set; }
        public string StatusText { get; set; }
        public int Role { get; set; }
        public string FacebookID { get; set; }
    }
}
