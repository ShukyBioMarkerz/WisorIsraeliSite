using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.VModels
{
    public class OrderVM
    {
        public int ID { get; set; }
        public string Label { get; set; }
        public int UserID { get; set; }
        public int Status { get; set; }
        public string StatusName { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public System.DateTime UpdatedOn { get; set; }
        public int DealType { get; set; }
        public string DealName { get; set; }
        public int NumberOfLoaners { get; set; }
        public int YoungestLoanerAge { get; set; }
        public int TotalNetIncome { get; set; }
        public bool Obligations { get; set; }
        public bool FutureMoney { get; set; }
        public int PropertyValue { get; set; }
        public int DesiredLoanAmount { get; set; }
        public int DesiredMonthlyPayment { get; set; }
        public bool RefinanceCheck { get; set; }
        public bool BankOffers { get; set; }
        public int PlanningPreference { get; set; }
        public int StabilityPreference { get; set; }
        public bool ChangesPreference { get; set; }
        public int Relations { get; set; }
        public bool Savings { get; set; }
        public Nullable<int> MainAccount { get; set; }
        public string MainBankName { get; set; }
        public Nullable<int> SecondaryAccount { get; set; }
        public string SecondaryAccountName { get; set; }
        public int ApprovingBanksCount { get; set; }
        public int SavingsCount { get; set; }
        public Nullable<int> EntranceMonth { get; set; }
        public Nullable<int> EntranceYear { get; set; }
        public Nullable<int> CurrentRent { get; set; }
        public Decimal? InitialCalculatedTotal { get; set; }
        public int OffersTotal { get; set; }

        public string StabilityValue { get; set; }
        public string PlaningValue { get; set; }

        public bool HasResults { get; set; }
    }
}
