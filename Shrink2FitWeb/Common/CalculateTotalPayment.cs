using Shrink2FitDAL.BL;
using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shrink2FitWeb.Common
{
	public class CalculateTotalPayment
	{

        class ResultsParameters
        {
            // Total principal paid
            public static double optTtlPrincipalPay = 0;

            // Total Interest paid
            public static double optTtlRatePay = 0;

            // Total Paid for entire loan time
            public static double optTtlPay = 0;
        }

		// *************************************** Calculating full luah silukin - One Option ***************************************** //
		private static TrackSumResult CalculateLuahSilukinSingleOption(bool inflated, double amtForCalc, int timeForCalc, double interestRate)
		{
            //double monthlyInflation = 0;
            //double monthlyPmt = 0;
            //double startingAmount = amtForCalc;
            //double monthlyRate = 0;
            //double calcPow = -1;
            //double principalPmt = -1;
            //double ratePmt = -1;

            //TrackSumResult result = new TrackSumResult();


            //// If rate is greater than zero - round the rate
            //if (interestRate > 0)
            //    monthlyRate = Math.Round((interestRate / 12), 8);

            //// If option type is inflated - Go through all months and calculate monthly payment
            //if (optTypeForCalc >= (int)Constants.typesList.FIXTSAMUD)
            //{
            //    monthlyInflation = Math.Round((Constants.inflation / 12), 8);
            //    for (uint months = 1; months <= timeForCalc; months++)
            //    {
            //        ratePmt = Math.Round((startingAmount * (1 + monthlyInflation) * monthlyRate), 2);
            //        if (monthlyRate == 0)
            //        {
            //            monthlyPmt = Math.Round(((amtForCalc * (1 + monthlyInflation)) / timeForCalc), 2);
            //        }
            //        else if (monthlyRate > 0)
            //        {
            //            calcPow = Math.Pow((1 + monthlyRate), timeForCalc);
            //            monthlyPmt = Math.Round(((amtForCalc * (1 + monthlyInflation)) * (monthlyRate * calcPow) / (calcPow - 1)), 2);
            //        }
            //        principalPmt = monthlyPmt - ratePmt;

            //        // Update results counters

            //        result.PrincipalPay += principalPmt;
            //        result.RatePayed += ratePmt;
            //        //result.TotalPay += monthlyPmt;					

            //        // Starting amount is updated after payment of principal only
            //        startingAmount = Math.Round((((startingAmount) * (1 + monthlyInflation)) - principalPmt), 2);

            //    }

            //    return result;

            //}
            //// If Option type is NOT inflated - no need for loop
            //else
            //{
            //    result.PrincipalPay = (int)(startingAmount);
            //    if (monthlyRate == 0)
            //    {
            //        monthlyPmt = Math.Round((amtForCalc / timeForCalc), 2);
            //    }
            //    else if (monthlyRate > 0)
            //    {
            //        calcPow = Math.Pow((1 + monthlyRate), timeForCalc);
            //        monthlyPmt = Math.Round((amtForCalc * (monthlyRate * calcPow) / (calcPow - 1)), 2);
            //    }
            //    //result.TotalPay = (int)(timeForCalc * monthlyPmt);
            //    result.RatePayed = result.TotalPay - result.PrincipalPay;

            //    return result;
            //}

            //************************New Algorithm**********************************

            // Parameters for calculation
            double monthlyInflation = 0;
            double monthlyRate = 0;
            double startingAmount = amtForCalc;
            double calcPow = -1;
            double monthlyPmt = 0;
            double principalPmt = -1;
            double ratePmt = -1;

            ResultsParameters.optTtlPrincipalPay = 0;
            ResultsParameters.optTtlRatePay = 0;
            ResultsParameters.optTtlPay = 0;

            // If rate is greater than zero - round the rate
            if (interestRate > 0)
                monthlyRate = Math.Round((interestRate / 12), 8);
            // If option type is inflated - Go through all months and calculate monthly payment
            if (inflated)
            {
                ResultsParameters.optTtlPrincipalPay = 0;
                ResultsParameters.optTtlRatePay = 0;
                ResultsParameters.optTtlPay = 0;
                monthlyInflation = Math.Round((Constants.inflation / 12), 8);
                for (uint months = 0; months < timeForCalc; months++)
                {
                    ratePmt = Math.Round((startingAmount * (1 + monthlyInflation) * monthlyRate), 2);
                    if (monthlyRate == 0)
                    {
                        monthlyPmt = Math.Round(((startingAmount * (1 + monthlyInflation)) / (timeForCalc - months)), 2);
                    }
                    else if (monthlyRate > 0)
                    {
                        calcPow = Math.Pow((1 + monthlyRate), (timeForCalc - months));
                        monthlyPmt = Math.Round(((startingAmount * (1 + monthlyInflation)) * (monthlyRate * calcPow) / (calcPow - 1)), 2);
                    }
                    principalPmt = monthlyPmt - ratePmt;
                    // Update results counters
                    ResultsParameters.optTtlPrincipalPay += principalPmt;
                    ResultsParameters.optTtlRatePay += ratePmt;
                    ResultsParameters.optTtlPay += monthlyPmt;
                    // Starting amount is updated after payment of principal only
                    startingAmount = Math.Round((((startingAmount) * (1 + monthlyInflation)) - principalPmt), 2);
                }
            }
            // If Option type is NOT inflated - no need for loop
            else
            {
                ResultsParameters.optTtlPrincipalPay = startingAmount;
                if (monthlyRate == 0)
                {
                    monthlyPmt = Math.Round((amtForCalc / timeForCalc), 2);
                }
                else if (monthlyRate > 0)
                {
                    calcPow = Math.Pow((1 + monthlyRate), timeForCalc);
                    monthlyPmt = Math.Round((amtForCalc * (monthlyRate * calcPow) / (calcPow - 1)), 2);
                }
                ResultsParameters.optTtlPay = timeForCalc * monthlyPmt;
                ResultsParameters.optTtlRatePay = ResultsParameters.optTtlPay - ResultsParameters.optTtlPrincipalPay;
            }

            TrackSumResult result = new TrackSumResult
            {
                PrincipalPay = ResultsParameters.optTtlPrincipalPay,
                RatePayed = ResultsParameters.optTtlRatePay,
                TotalPay = (int)ResultsParameters.optTtlPay
            };

            return result;


		}

        public static double CalculatePMT(/*bool inflated,*/ double amount, int time, double interestRate)
        {
            double monthlyRate = 0;
            double calcPow = -1;
            double monthlyPmt = 0;

            if (interestRate > 0)
            {
                monthlyRate = Math.Round((interestRate / 12), 8);
                calcPow = Math.Pow((1 + monthlyRate), time);
                monthlyPmt = Math.Round((amount * (monthlyRate * calcPow) / (calcPow - 1)), 2);
            }
            else
            {
                monthlyPmt = Math.Round((amount / time), 2);
            }
         
            return monthlyPmt;
        }

		// ***************************************************** MAIN FUNCTION ******************************************************** //

		public static TrackSumResult GetTotalPayments(int t, double a, int m, double r)
		{
			// Input
			InputParameters.optionType = t;
			InputParameters.amountForCheck = a;
			InputParameters.timeForCheck = m;
			InputParameters.rateForCheck = r;

			// If Amount in range and time in range and type is in range and rate is in range - perform calculation
			if ((InputParameters.amountForCheck >= Constants.minimumLoanAmount) && (InputParameters.amountForCheck <= Constants.maximumLoanAmount) &&
					(InputParameters.timeForCheck >= Constants.minTimeForLoan) && (InputParameters.timeForCheck <= Constants.maxTimeForLoan) &&
						(InputParameters.optionType > (int)Constants.typesList.EMPTY) && (InputParameters.optionType <= (int)Constants.typesList.ALT120) &&
							(InputParameters.rateForCheck >= 0))
			{
                return CalculateLuahSilukinSingleOption(InputParameters.optionType >= (int)Constants.typesList.FIXTSAMUD, InputParameters.amountForCheck, InputParameters.timeForCheck, InputParameters.rateForCheck);
			}
			else
			{
				return null;
				// Input error - data out of range for check
			}
		}

        public static void CalculateSummations(List<ResultVM> model)
        {
            try
            {
                foreach (var result in model)
                {
                    foreach (var line in result.Options)
                    {
                        bool inflated = OrderBL.IsTrackInflated(line.TrackType);
                        line.Summation = CalculateLuahSilukinSingleOption(inflated, (double)line.Amount, line.Time, (double)(line.Rate / 100));
                        line.Summation.TotalPay = (int)line.Summation.PrincipalPay + (int)line.Summation.RatePayed;
                    }
                }
            }
            catch
            {
                throw new Exception("Could not get summations for tracks");
            }
        }

		public static void CalculateSummations(List<OfferVM> model)
		{
			try
			{
				foreach (var result in model)
				{
					foreach (var line in result.Tracks)
					{
                        bool inflated = OrderBL.IsTrackInflated(line.TrackType);
                        line.Summation = CalculateLuahSilukinSingleOption(inflated, (double)line.Amount, line.Time, (double)(line.Rate / 100));
                        line.Summation.TotalPay = (int)line.Summation.PrincipalPay + (int)line.Summation.RatePayed;
					}
				}
			}
			catch
			{
				throw new Exception("Could not get summations for tracks");
			}
		}
    }
}