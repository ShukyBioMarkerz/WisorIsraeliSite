using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class UserFacebookDetails
    {
        public string id { get; set; }
        public string name { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string link { get; set; }
        public string gender { get; set; }
        public int? timezone { get; set; }
        public string locale { get; set; }
        public string email { get; set; }
        public bool verified { get; set; }
        public string updated_time { get; set; }
       
       
        
    }
}
