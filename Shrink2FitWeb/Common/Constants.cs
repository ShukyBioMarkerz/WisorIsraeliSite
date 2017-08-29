using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace Shrink2FitWeb.Common
{
    public class Constants
    {
        // Types list - ** Fix Tsamud is always the first inflated type - everything before is not inflated **
        public enum typesList { EMPTY, PRIME, FIXNOTSAMUD, ALT60NOTSAMUD, FIXTSAMUD, ALT12, ALT24, ALT30, ALT60, ALT84, ALT120 };
        public static string[] optionTypes = { "EMPTY", "PRIME", "FIXNOTSAMUD", "ALT60NOTSAMUD", "FIXTSAMUD", "ALT12", "ALT24", "ALT30", "ALT60", "ALT84", "ALT120" };
                                                    
        // Maximum loan amount possible
        public const double maximumLoanAmount = 5000000;

        // Minimum Amount possible in a single Option
        public const double minimumLoanAmount = 40000;

        // Yearly inflation for calculation
        public const double inflation = 0.022;

        // Minimum time to devide a loan
        public const uint minTimeForLoan = 48;

        // Maximum time to devide a loan
        public const uint maxTimeForLoan = 360;


		public static string GetConstants(string key)
		{
			return WebConfigurationManager.AppSettings[key];
		}
    }



    class InputParameters
    {
        // Option types chosen for check
        public static int optionType = (int)Constants.typesList.EMPTY;

        // Amount for check - input
        public static double amountForCheck = -1;

        // Time for calculation - input
        public static int timeForCheck = 0;

        // Time for calculation - input
        public static double rateForCheck = -1;
    }



    class ResultsParameters
    {
		// Monthly payment for option (first month)
		public double optPmt { get; set; }

		// Total principal paid
		public double optTtlPrincipalPay { get; set; }

		// Total Interest paid
		public double optTtlRatePay { get; set; }

		// Total Paid for entire loan time
		public double optTtlPay { get; set; }

        // Monthly payment for option (first month)
		//public static double optPmt = -1;

		//// Total principal paid
		//public static double optTtlPrincipalPay = 0;

		//// Total Interest paid
		//public static double optTtlRatePay = 0;

		//// Total Paid for entire loan time
		//public static double optTtlPay = 0;
    }

	
}

