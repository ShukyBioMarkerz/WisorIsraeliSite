using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.BL
{
    public static class BankBL
    {
        

        public static bool AddBank(ListBank bank)
        {
            try
            {
                using(Shrink2FitEntities ctx = new Shrink2FitEntities())
                {
                    ctx.ListBanks.Add(bank);
                    ctx.SaveChanges();
                }
                return true;
            }
            catch
            {
                return false;
            }
        }

		public static List<BankVM> GetAllBanks()
		{
			try
			{
				var result = new List<BankVM>();
				using (Shrink2FitEntities context = new Shrink2FitEntities())
				{
					result = context.ListBanks.Where(b=> b.Available == true).Select(b => new BankVM
					{
						ID = b.ID,
						Available = b.Available,
						PrimaryOption = b.PrimaryOption,
						Name = b.Name,
						BankNumber = b.BankNumber
					}).ToList();
				}
				return result;
			}
			catch
			{
				return null;
			}
		}


        public static List<BankVM> GetApprovingBanksForOrderID(int id)
        {
            try
            {
                var result = new List<BankVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    result = context.Orders.Single(o => o.ID == id).ListBanks.Select(b => new BankVM
                    {
                        ID = b.ID,
                        BankNumber = b.BankNumber,
                        Name = b.Name,
                        Available = b.Available,
                        PrimaryOption = b.PrimaryOption
                    }).ToList();
                }
                return result;
            }
            catch
            {
                throw new Exception("Could not retrieve list");
            }
        }
    }
		
}
