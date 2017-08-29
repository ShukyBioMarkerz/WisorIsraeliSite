//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Shrink2FitDAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public User()
        {
            this.Orders = new HashSet<Order>();
        }
    
        public int ID { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string SecondaryEmail { get; set; }
        public Nullable<System.DateTime> LastLogin { get; set; }
        public int Status { get; set; }
        public int Role { get; set; }
        public string FacebookID { get; set; }
        public bool IsVerified { get; set; }
        public string TempID { get; set; }
    
        public virtual UserStatus UserStatus { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}