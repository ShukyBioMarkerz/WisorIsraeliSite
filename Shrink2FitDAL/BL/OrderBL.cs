using FastThreeOptionSearchV3_2_1;
using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.BL
{
    public static class OrderBL
    {
        public static OrderVM GetOrderByID(int id)
        {
            try
            {
                OrderVM result = null;
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var order = context.Orders.Single(o => o.ID == id);
                    result = new OrderVM
                    {
                        ID = order.ID,
                        CreatedOn = order.CreatedOn,
                        BankOffers = order.BankOffers,
                        DealType = order.DealType,
                        DealName = order.DealType1.DealType1,
                        ChangesPreference = order.ChangesPreference,
                        FutureMoney = order.FutureMoney,
                        Obligations = order.Obligations,
                        DesiredLoanAmount = order.DesiredLoanAmount,
                        DesiredMonthlyPayment = order.DesiredMonthlyPayment,
                        Label = order.Label,
                        NumberOfLoaners = order.NumberOfLoaners,
                        TotalNetIncome = order.TotalNetIncome,
                        UpdatedOn = order.UpdatedOn,
                        UserID = order.UserID,
                        PlanningPreference = order.PlanningPreference,
                        PropertyValue = order.PropertyValue,
                        RefinanceCheck = order.RefinanceCheck,
                        StabilityPreference = order.StabilityPreference,
                        Status = order.Status,
                        StatusName = order.OrderStatus.Status,
                        YoungestLoanerAge = order.YoungestLoanerAge,
                        Savings = order.Savings,
                        ApprovingBanksCount = order.ListBanks.Count,
                        SavingsCount = order.Savings1.Count,
                        Relations = order.Relations,
                        CurrentRent = order.CurrentRent,
                        EntranceMonth = order.EntranceMonth,
                        EntranceYear = order.EntranceYear,
                        MainAccount = order.MainAccount,
                        SecondaryAccount = order.SecondaryAccount
                       
                                         
                    };

                }
                return result;

            }
            catch
            {
                return null;
            }
        }

        public static List<OrderVM> GetAll()
        {
            try
            {
                var result = new List<OrderVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    
                    result = context.Orders.Include("ListBanks").Include("Savings1").Include("ListBanks1").Include("ListBanks2").OrderBy(o => o.CreatedOn).Select(order => new OrderVM
                    {
                        ID = order.ID,
                        CreatedOn = order.CreatedOn,
                        BankOffers = order.BankOffers,
                        DealType = order.DealType,
                        ChangesPreference = order.ChangesPreference,
                        FutureMoney = order.FutureMoney,
                        Obligations = order.Obligations,
                        DesiredLoanAmount = order.DesiredLoanAmount,
                        DesiredMonthlyPayment = order.DesiredMonthlyPayment,
                        Label = order.Label,
                        NumberOfLoaners = order.NumberOfLoaners,
                        TotalNetIncome = order.TotalNetIncome,
                        UpdatedOn = order.UpdatedOn,
                        UserID = order.UserID,
                        PlanningPreference = order.PlanningPreference,
                        PropertyValue = order.PropertyValue,
                        RefinanceCheck = order.RefinanceCheck,
                        StabilityPreference = order.StabilityPreference,
                        Status = order.Status,
                        YoungestLoanerAge = order.YoungestLoanerAge,
                        Savings = order.Savings,
                        Relations = order.Relations,
                        ApprovingBanksCount = order.ListBanks.Count,
                        SavingsCount = order.Savings1.Count,
                        CurrentRent = order.CurrentRent,
                        EntranceMonth = order.EntranceMonth,
                        EntranceYear = order.EntranceYear,
                        MainAccount = order.MainAccount,
                        SecondaryAccount = order.SecondaryAccount,
                        MainBankName = order.ListBank.Name,
                        SecondaryAccountName = order.ListBank1.Name,
                        HasResults = order.ResultEntries.Count > 0 ,
                        PlaningValue = order.PlanningValue,
                        StabilityValue = order.StabilityValue


                    }).OrderByDescending(o => o.CreatedOn).ToList();
                }

                return result;

            }
            catch (Exception ex)
            {
                Console.WriteLine("ERROR OrderBL.GetAll Exception: " + ex.Message);
                return new List<OrderVM>();
            }
        }

        public static List<OrderStatusVM> GetAllStatus()
        {
            try
            {
                var result = new List<OrderStatusVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    result = context.OrderStatus.Select(s => new OrderStatusVM
                    {
                        ID = s.ID,
                        Status = s.Status
                    }).ToList();
                }
                return result;
            }
            catch
            {
                return new List<OrderStatusVM>();
            }
        }

        public static List<DealTypeVM> GetAllDealtypes()
        {
            try
            {
                var result = new List<DealTypeVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    result = context.DealTypes.Select(t => new DealTypeVM
                    {
                        ID = t.ID,
                        DealType = t.DealType1
                    }).ToList();
                }
                return result;
            }
            catch
            {
                return new List<DealTypeVM>();
            }
        }

        public static List<RelationshipTypeVM> GetAllBorrowerRelations()
        {
            try
            {
                var result = new List<RelationshipTypeVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    result = context.RelationshipTypes.Select(t => new RelationshipTypeVM
                    {
                        ID = t.ID,
                        RelationsName = t.RelationsName
                    }).ToList();
                }
                return result;
            }
            catch
            {
                return new List<RelationshipTypeVM>();
            }
        }


        public static List<ListedTracksVM> GetAllListedTracks()
		{
			try
			{
				var result = new List<ListedTracksVM>();
				using (Shrink2FitEntities context = new Shrink2FitEntities())
				{
					result = context.ListedTracks.Select(t => new ListedTracksVM
					{
						ID = t.ID,
						Name = t.Name,
                        Inflated = t.Inflated,
                        JumpsInMonths = t.JumpsInMonths,
                        MaxTimeMonths = t.MaxTimeMonth,
                        MinTimeMonths = t.MinTimeMonths
					}).ToList();
				}
				return result;
			}
			catch
			{
				return new List<ListedTracksVM>();
			}
		}

        public static List<ObligationFutureVM> GetFutureObligations(int id, int type)
        {
            try
            {
                var result = new List<ObligationFutureVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    result = context.ObligationOrFutures.Where(s => s.OrderID == id && s.Type == type).Select(of => new ObligationFutureVM
                    {
                        Amount = of.Amount,
                        ID = of.ID,
                        OrderID = of.OrderID,
                        EndMonth = of.EndMonth,
                        EndYear = of.EndYear
                        
                    }).ToList();
                }
                return result;

            }
            catch
            {
                throw new Exception("Could not retrieve list");
            }
        }

        public static List<SavingVM> GetSavings(int orderid)
        {
            try
            {
                var result = new List<SavingVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    result = context.Savings.Include("SavingsType1").Where(s => s.OrderID == orderid).Select(s => new SavingVM
                    {
                        ID = s.ID,
                        OrderID = s.OrderID,
                        AmountSaved = s.AmountSaved,
                        Liquidity = s.Liquidity,
                        SavingsType = s.SavingsType1.SavingTypeName,
                        Yield = s.Yield
                    }).ToList();
                }
                return result;
            }
            catch
            {
                throw new Exception("Could not retrieve list");
            }
        }

		public static List<SavingsTypesVM> GetSavingsTypes()
		{
			try
			{
				var result = new List<SavingsTypesVM>();
				using (Shrink2FitEntities context = new Shrink2FitEntities())
				{
					result = context.SavingsTypes.Select(s => new SavingsTypesVM
					{
						ID = s.ID,
						SavingTypeName = s.SavingTypeName						
					}).ToList();
				}
				return result;
			}
			catch
			{
				throw new Exception("Could not retrieve list");
			}
		}

		public static List<OrderVM> GetAllUserOrders(int userid)
		{
			try
			{
				List<OrderVM> result = new List<OrderVM>();
				
				using (Shrink2FitEntities context = new Shrink2FitEntities())
				{
					var orders = context.Orders.Where(o => o.UserID == userid);

					foreach (var order in orders)
					{

                        if (order.DealType > 3)
                        {
                            order.DealType = 3;
                            order.DealType1 = context.DealTypes.Single(t => t.ID == 3);
                        }
						var currentOrder = new OrderVM
						{
							ID = order.ID,
							CreatedOn = order.CreatedOn,
							BankOffers = order.BankOffers,
							DealType = order.DealType,
							ChangesPreference = order.ChangesPreference,
							FutureMoney = order.FutureMoney,
							Obligations = order.Obligations,
							DesiredLoanAmount = order.DesiredLoanAmount,
							DesiredMonthlyPayment = order.DesiredMonthlyPayment,
							Label = order.Label,
							NumberOfLoaners = order.NumberOfLoaners,
							TotalNetIncome = order.TotalNetIncome,
							UpdatedOn = order.UpdatedOn,
							UserID = order.UserID,
							PlanningPreference = order.PlanningPreference,
							PropertyValue = order.PropertyValue,
							RefinanceCheck = order.RefinanceCheck,
							StabilityPreference = order.StabilityPreference,
							Status = order.Status,
							YoungestLoanerAge = order.YoungestLoanerAge,
							Savings = order.Savings,
							ApprovingBanksCount = order.ListBanks.Count(),
							SavingsCount = order.Savings1.Count(),
							Relations = order.Relations,
							StatusName = order.OrderStatus.Status,
							DealName = order.DealType1.DealType1,
							HasResults = order.ResultEntries.Count > 0 ? true : false,
                            InitialCalculatedTotal = order.InitialCalculatedTotal,
                            OffersTotal = 0,
                            PlaningValue = order.PlanningValue,
                            StabilityValue = order.StabilityValue
                        };

                        result.Add(currentOrder);
					}
				}
				return result;

			}
			catch
			{
				return null;
			}
		}



        public static Order ProcessOrder(OrderDataContainer Data, out SearchResult fasstSearchResult)
        {
            try
            {
                using(Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    Order order = new Order{
							UserID = Data.Userid,
							DesiredLoanAmount = Data.LoanDetails.LoanDesire,
							DesiredMonthlyPayment = Data.LoanDetails.WantedReturn,
							PropertyValue = Data.LoanDetails.PropertyValue,
							TotalNetIncome = Data.Loaners.NetoSum,
							NumberOfLoaners = Data.Loaners.NumBorrowers,
							YoungestLoanerAge = Data.Loaners.YoungBorrower,
							
							DealType = Data.DealType.Type,
							Status = context.OrderStatus.First().ID,
							OrderStatus = context.OrderStatus.First(),
							Obligations = Data.Loaners.IsDebts,
							FutureMoney = Data.Loaners.IsRelease,
							BankOffers = Data.Offers.HasOffers,
							CreatedOn = DateTime.Now,
							UpdatedOn = DateTime.Now,
							RefinanceCheck = false,
							Relations = Data.Loaners.Relations,
							ChangesPreference = Data.Personal.changes == true,
							
							MainAccount = Data.Banks.Accounts.Main,
							SecondaryAccount = Data.Banks.Accounts.Secondary,
							Label = Data.Label,
                            Savings = Data.Loaners.IsSavings,
                            PlanningValue = Data.Personal.planningTime,
                            StabilityValue = Data.Personal.stability
						};


                    // fast search calculation
                    var fastSearch = new FastSearch(
                        (double)Data.LoanDetails.LoanDesire,
                        (double)Data.LoanDetails.WantedReturn,
                        (uint)Data.Loaners.YoungBorrower,
                        (uint)Data.LoanDetails.PropertyValue,
                        (uint)Data.Loaners.NetoSum,
                        Data.Label);

                    var result = fastSearch.Run();

                    fasstSearchResult = result;

                    order.InitialCalculatedTotal = (decimal)result.BestComposition.ttlPay;

                    if (Data.DealType.DealProperty != null)
                    {
                        order.EntranceMonth = Data.DealType.DealProperty.EnterMonth;
                        order.EntranceYear = Data.DealType.DealProperty.EnterYear;
                        order.CurrentRent = Data.DealType.DealProperty.HasRent ? Data.DealType.DealProperty.CurrentRent : null;
                    }
                    
                    if (Data.Loaners.IsSavings)
                    {
                        foreach (var saving in Data.Loaners.Savings)
                        {
                           
                            var entry = new Saving
                            {
                                AmountSaved = saving.AmountSaved,
                                Liquidity = saving.Liquidity,
                                SavingsType = saving.SavingsType,
                                Yield = saving.Yield
                                
                            };
                            order.Savings1.Add(entry);
                        }
                    }


                    if (order.ChangesPreference)
                    {
                        order.ChangePreferences.Add(new ChangePreference
                        {
                            NewPredictedPayment = Data.Personal.changesType.ToLower() == "monthlyreturn" ? (int?)Data.Personal.monthlyReturnSum : null,
                            TimeOfChange = Data.Personal.changesType.ToLower() == "monthlyreturn" ? (int?)Data.Personal.monthlyReturnTime : null,
                            TimeOfRepay = Data.Personal.changesType.ToLower() != "monthlyreturn" ? (int?)Data.Personal.fullOutTime : null
                        });
                    }

                    if (order.BankOffers)
                    {
                        var bankOffers = Data.Offers.OffersList.GroupBy(o => o.BankId);
                        foreach (var bankOffer in bankOffers)
                        {
                            var newOffer = new OffersOrCheck
                            {
                                Type = 1,
                                ApprovingBank = bankOffer.First().BankId
                                
                                
                            };

                            foreach (var offer in bankOffer)
                            {
                                newOffer.Tracks.Add(new Track
                                {
                                    Amount = offer.Sum,
                                    Inflation = offer.Indexation,
                                    PMT = offer.ReturnSum,
                                    Time = offer.Time,
                                    Rate = offer.Interest,
                                    TrackType = offer.Type
                                });
                            }

                            order.OffersOrChecks.Add(newOffer);
	            
                           

                        }
                    }

					if (Data.RecycleCheck != null )
                    {
                        // now the RefinanceCheck should be changed
                        if (0 < Data.RecycleCheck.RecycleLoans.Count)
                            order.RefinanceCheck = true;

                        var recycle = new OffersOrCheck
                        {
                            ApprovingBank = Data.RecycleCheck.RecycleLoanBankNumber,
                            Type = 2
                        };
                        
                        foreach (var loan in Data.RecycleCheck.RecycleLoans)
                        {
                            recycle.Tracks.Add(new Track
                            {
                                Amount = loan.Sum,
                                Inflation = loan.Indexation,
                                PMT = loan.ReturnSum,
                                Rate = loan.Interest,
                                TrackType = loan.Type,
                                YearTaken = loan.StartYear,
                                MonthTaken = loan.StartMonth,
                                Time = loan.Time
                                
                            });
                        }

                        order.OffersOrChecks.Add(recycle);
                    }

                    if (order.Obligations)
                    {
                        foreach (var obligation in Data.Loaners.Debts)
                        {
                            order.ObligationOrFutures.Add(new ObligationOrFuture
                            {
                                Type = 1,
                                Amount = obligation.Sum,
                                EndMonth = obligation.Month,
                                EndYear = obligation.Year
                                
                                
                            });
                        }
                    }

                    if (order.FutureMoney)
                    {
                        foreach (var release in Data.Loaners.Releases)
                        {
                            order.ObligationOrFutures.Add(new ObligationOrFuture
                            {
                                Type = 2,
                                Amount = release.Sum,
                                EndMonth = release.Month,
                                EndYear = release.Year
                                

                            });
                        }
                    }

					foreach (var bank in Data.Banks.BanksList)
                    {
                        if (context.ListBanks.SingleOrDefault(b => b.ID == bank.BankID) != null)
                        {
                            order.ListBanks.Add(context.ListBanks.SingleOrDefault(b => b.ID == bank.BankID));
                        }
                        else
                        {

                            ListBank newBank = new ListBank
                            {
                                Name = bank.BankName,
                                Available = false,
                                PrimaryOption = false
                            };

                            context.ListBanks.Add(newBank);

                            context.SaveChanges();

                            order.ListBanks.Add(newBank);


                        }
                    }
					
					if (Data.Label == null)
					{
                        
                        order.Label = GetLabel(order.UserID, Data.DealType.Type);
                        context.Orders.Add(order);
                        
					}
					else
					{						
						var oldOrder = context.Orders.SingleOrDefault(o => o.Label == Data.Label);

                        if (oldOrder != null)
                        {

                            order.ID = oldOrder.ID;

                            context.Entry(oldOrder).CurrentValues.SetValues(order);
                        }
                        else
                        {
                            order.Label = GetLabel(order.UserID, Data.DealType.Type);
                            context.Orders.Add(order);
                        }
						
						
					}

                    context.SaveChanges();

					return order;
                   
                }
            }
            catch(Exception ex)
            {
                throw new Exception("Could not process order: " + ex.Message);
            }
        }

        public static string GetLabel(int userid,  int dealType)
        {
			string prefix = "";

			if (dealType != 1)
			{
				prefix = "PF";
			}
			else
			{
				
				prefix = "RF";
				
			}

			string label = prefix;

            if (userid / 10 < 1)
            {
                label += "000" + userid.ToString();
            }
            else if (userid / 100 < 1)
            {
                label += "00" + userid.ToString();
            }
            else
            {
                label += "0" + userid.ToString();
            }

            using (Shrink2FitEntities context = new Shrink2FitEntities())
            {
                int count = context.Orders.Count(o => o.UserID == userid);

				if (count/10 < 1)
				{
					label += "000" + count.ToString();
				}
				else if (count/100 < 1)
				{
					label += "00" + count.ToString();
				}
				else
				{
					label += "0" + count.ToString();
				}

				// make sure label doesnt exist
				var LabelExist = context.Orders.Count(o => o.Label == label);

				if (LabelExist != 0){
					return null;
				}
            }


            return label;
        }

        public static PropertyDetailsVM GetPropertyDetails(int id)
        {
            try
            {
                PropertyDetailsVM result;
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var entry = context.Orders.Single(o => o.ID == id);
                    result = new PropertyDetailsVM
                    {
                        EntranceMonth = (int)entry.EntranceMonth,
                        EntranceYear = (int)entry.EntranceYear,
                        CurrentRent = entry.CurrentRent
                    };
                }
                return result;
            }
            catch
            {
                throw new Exception("Could not get order property details");
            }
        }

        public static List<ChangePreferenceVM> GetChangePrefernces(int id)
        {
            try
            {
                List<ChangePreferenceVM> result = new List<ChangePreferenceVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var entry = context.Orders.Single(o => o.ID == id);
                    foreach (var item in entry.ChangePreferences)
                    {
                        result.Add(new ChangePreferenceVM()
                        {
                            Type = item.NewPredictedPayment == null ? "Repayment" : "New PMT",
                            Time = item.TimeOfChange != null? item.TimeOfChange: item.TimeOfRepay,
                            newPayment = item.NewPredictedPayment
                        });
                    }
                    
                }
                return result;
            }
            catch
            {
                throw new Exception("Could not get order property details");
            }

        }

        public static bool SetInvoice(int OrderId, decimal amount)
		{
			try
			{
				using (Shrink2FitEntities context = new Shrink2FitEntities())
				{
					var invoice = new Invoice
					{
						OrderID = OrderId,
						IsBilling = true,
						CreatedOn = DateTime.Now,						
						NumberOfPayments = 1,
						CurrencyID = 1,
						Link = "",
                        Amount = amount
                        
					};
					context.Invoices.Add(invoice);
                   
					context.SaveChanges();
					
				}
                
                return true;
			}
			catch
			{
				return false;
				throw new Exception("Cannot add invoice");
			}
			

		}

		public static bool CheckForInvoice(int OrderId)
		{
			try
			{
				using (Shrink2FitEntities context = new Shrink2FitEntities())
				{
					bool contactExists = context.Invoices.Any(i => i.OrderID.Equals(OrderId));

					return contactExists;
				}
			}
			catch
			{
				return false;				
			}
		}

        public static bool IsTrackInflated(int trackID)
        {
            try
            {
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    bool contactExists = context.ListedTracks.Single(t => t.ID == trackID).Inflated;

                    return contactExists;
                }
            }
            catch
            {
                return false;
            }
        }

        public static int GetInitialCalculation(int orderId)
        {
            try
            {
                int result = 0;
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    result = (int)context.Orders.Single(o => o.ID == orderId).InitialCalculatedTotal;
                }
                return result;
            }
            catch
            {
                return 0;
            }

        }

        public static void ChangeOrderStatus(int orderId, int status)
        {
            try
            {
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var order = context.Orders.Single(o => o.ID == orderId);
                    order.Status = status;
                    context.Entry(order).State = System.Data.EntityState.Modified;
                    context.SaveChanges();
                }
            }
            catch
            {
                throw new Exception("Could not update status for order");
            }
        }

        public static List<InvoiceVM> GetInvoicesForUser(int userId)
        {
            try
            {
                var result = new List<InvoiceVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var orders = context.Users.Single(u => u.ID == userId).Orders;
                    foreach (var order in orders)
                    {
                        result.AddRange(order.Invoices.Select(i => new InvoiceVM
                        {
                            ID = i.ID,
                            Label = order.Label,
                            CreatedOn = i.CreatedOn,
                            DealType = order.DealType1.DealType1,
                            OrderCreation = order.CreatedOn,
                            Amount = i.Amount
                            
                        }).AsEnumerable());
                    }
                    
                }
                return result;
            }
            catch
            {
                return new List<InvoiceVM>();
            }
        }

        public static string getDealTypeName(int dealType)
        {
            try
            {
                string result = "";
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    result = context.DealTypes.Single(t => t.ID == dealType).DealType1;
                }
                return result;
            }
            catch
            {
                return "לא ידוע";
            }
        }

        // Status values: 1 == new order. 2 == open. 3 == calculation
        /*
         * var model = OrderBL.GetAll();
         */
        public static List<OrderVM> GetAllOrdersByStatus(int status)
        {
            try
            {
                List<OrderVM> result = new List<OrderVM>();

                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    var orders = context.Orders.Where(o => o.Status == status);

                    foreach (var order in orders)
                    {

                        if (order.DealType > 3)
                        {
                            order.DealType = 3;
                            order.DealType1 = context.DealTypes.Single(t => t.ID == 3);
                        }
                        var currentOrder = new OrderVM
                        {
                            ID = order.ID,
                            CreatedOn = order.CreatedOn,
                            BankOffers = order.BankOffers,
                            DealType = order.DealType,
                            ChangesPreference = order.ChangesPreference,
                            FutureMoney = order.FutureMoney,
                            Obligations = order.Obligations,
                            DesiredLoanAmount = order.DesiredLoanAmount,
                            DesiredMonthlyPayment = order.DesiredMonthlyPayment,
                            Label = order.Label,
                            NumberOfLoaners = order.NumberOfLoaners,
                            TotalNetIncome = order.TotalNetIncome,
                            UpdatedOn = order.UpdatedOn,
                            UserID = order.UserID,
                            PlanningPreference = order.PlanningPreference,
                            PropertyValue = order.PropertyValue,
                            RefinanceCheck = order.RefinanceCheck,
                            StabilityPreference = order.StabilityPreference,
                            Status = order.Status,
                            YoungestLoanerAge = order.YoungestLoanerAge,
                            Savings = order.Savings,
                            ApprovingBanksCount = order.ListBanks.Count(),
                            SavingsCount = order.Savings1.Count(),
                            Relations = order.Relations,
                            StatusName = order.OrderStatus.Status,
                            DealName = order.DealType1.DealType1,
                            HasResults = order.ResultEntries.Count > 0 ? true : false,
                            InitialCalculatedTotal = order.InitialCalculatedTotal,
                            OffersTotal = 0,
                            PlaningValue = order.PlanningValue,
                            StabilityValue = order.StabilityValue
                        };

                        result.Add(currentOrder);
                    }
                }
                return result;

            }
            catch
            {
                return null;
            }
        }


    }
}
