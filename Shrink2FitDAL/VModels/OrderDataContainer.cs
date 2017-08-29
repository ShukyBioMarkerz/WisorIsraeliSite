using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shrink2FitDAL.VModels
{
	public class OrderDataContainer
	{
		public int Userid { get; set; }
		public DealType DealType { get; set; }
		public Loaners Loaners { get; set; }
		public LoanDetails LoanDetails { get; set; }
		public Banks Banks { get; set; }
		public Offers Offers { get; set; }
		public Personal Personal { get; set; }
		public RecycleCheck RecycleCheck { get; set; }
		public string Label { get; set; }
	}

	//************
	// sub classes
	//************

	public class DealType
	{
		public int Type { get; set; }
		public Property DealProperty {get;set;}
	}

		public class Property 
		{
			public int? CurrentRent { get; set; }
			public int? EnterMonth { get; set; }
			public int? EnterYear { get; set; }
			
			public bool HasRent { get; set; } // true - first hand & other properties requierd, false = second hand & other properties null
		}

	public class Loaners 
	{
		public int NumBorrowers { get; set; }
		public int YoungBorrower { get; set; }
		public int NetoSum { get; set; }
		public int Relations { get; set; }

		public bool IsDebts { get; set; }
		public List<DebtsReleases> Debts { get; set; }

		public bool  IsRelease { get; set; }
		public List<DebtsReleases> Releases { get; set; }

		public bool IsSavings { get; set; }
		public List<Saving> Savings { get; set; }
	}

		public class Saving
		{
			public int AmountSaved { get; set; }
			public int SavingsType { get; set; }
			public decimal Yield { get; set; }
			public bool Liquidity { get; set; }
		}

		public class DebtsReleases
		{
			public int Sum { get; set; }
			public int Month { get; set; }
			public int Year { get; set; }
		}

	public class LoanDetails
	{
		public int PropertyValue { get; set; }
		public int LoanLeft { get; set; }

		public int LoanDesire { get; set; }
		public int SelfWealth { get; set; }

		public int WantedReturn { get; set; }
	}

	public class Banks
	{
		public List<Bank> BanksList { get; set; }		
		public Accounts Accounts { get; set; }
	}

		public class Bank
		{
			public int BankID { get; set; }
			public string BankName { get; set; }
		}

		public class Accounts
		{
			public int? Main { get; set; }
			public int? Secondary { get; set; }
		}

	public class Offers 
	{
		public bool HasOffers { get; set; }
		public List<Offer> OffersList { get; set; }
	}
	
	public class Offer
		{
			public int Sum { get; set; }
			public int Type { get; set; }
			public decimal Interest { get; set; }
			public bool Indexation { get; set; }
			public int Time { get; set; }
			public int ReturnSum { get; set; }
			public int BankId { get; set; }
		}

	public class Personal
	{
		public string planningTime { get; set; }
		public string stability { get; set; }
		public bool changes { get; set; }
		public string changesType { get; set; }
		public int monthlyReturnSum { get; set; }
		public int monthlyReturnTime { get; set; }
		public int fullOutTime { get; set; }
	}

	public class RecycleCheck
	{
		
		public int RecycleLoanBankNumber { get; set; }
		public List<RecycleLoan> RecycleLoans { get; set; }
	}

	public class RecycleLoan
		{
			public int Sum { get; set; }
			public int Type { get; set; }
			public decimal Interest { get; set; }
			public bool Indexation { get; set; }
			public int Time { get; set; }
			public int ReturnSum { get; set; }
            public int StartMonth { get; set; }
            public int StartYear { get; set; }
		}
}