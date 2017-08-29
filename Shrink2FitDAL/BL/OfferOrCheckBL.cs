using Shrink2FitDAL.VModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shrink2FitDAL.BL
{
    public static class OfferOrCheckBL
    {
        public static List<OfferVM> GetOfferingBanksForOrder(string orderlabel)
        {
            if (string.IsNullOrEmpty(orderlabel))
            {
                return new List<OfferVM>();
            }
            try
            {
                var result = new List<OfferVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    int orderid = context.Orders.Single(o => o.Label.ToLower() == orderlabel.ToLower()).ID;
                    var offers = context.OffersOrChecks.Where(oc => oc.OrderID == orderid && oc.Type == 1).GroupBy(oc => oc.ApprovingBank);
                    foreach (var offer in offers)
                    {
                        var bankOffer = offer.First();
                        if (bankOffer.ApprovingBank == 0)
                        {
                            bankOffer.ApprovingBank = context.ListBanks.First(b => b.BankNumber == 0).ID;
                        }
                        var bank = context.ListBanks.Single(b => b.ID == bankOffer.ApprovingBank);
                        var offervm = new OfferVM
                        {
                            BankID = (int)bankOffer.ApprovingBank,
                            BankIdentifier = bank.BankNumber,
                            BankName = bank.Name,
                            Tracks = new List<TrackVM>()
                        };

                        offervm.Tracks = bankOffer.Tracks.Select(t => new TrackVM
                        {
                            Amount = t.Amount,
                            ID = t.ID,
                            Inflation = t.Inflation,
                            TrackType = t.TrackType,
                            TrackTypeName = t.ListedTrack != null ? t.ListedTrack.Name : "",
                            PMT = t.PMT,
                            Rate = t.Rate,
                            Time = t.Time
                            
                        }).ToList();

                        result.Add(offervm);
                    }
                }
                return result;

            }
            catch(Exception ex)
            {
                throw new Exception("Could not retrieve offers list");
            }
        }

        public static List<OfferVM> GetRefinanceCheck(string orderlabel)
        {
            if (string.IsNullOrEmpty(orderlabel))
            {
                return new List<OfferVM>();
            }
            try
            {
                var result = new List<OfferVM>();
                using (Shrink2FitEntities context = new Shrink2FitEntities())
                {
                    int orderid = context.Orders.Single(o => o.Label.ToLower() == orderlabel.ToLower()).ID;
                    var offers = context.OffersOrChecks.Where(oc => oc.OrderID == orderid && oc.Type == 2).GroupBy(oc => oc.ApprovingBank);
                    foreach (var offer in offers)
                    {
                        var bankOffer = offer.First();
                        var bank = context.ListBanks.Single(b => b.ID == bankOffer.ApprovingBank);
                        var offervm = new OfferVM
                        {
                            BankID = (int)bankOffer.ApprovingBank,
                            BankIdentifier = bank.BankNumber,
                            BankName = bank.Name,
                            Tracks = new List<TrackVM>()
                        };

                        offervm.Tracks = bankOffer.Tracks.Select(t => new TrackVM
                        {
                            Amount = t.Amount,
                            ID = t.ID,
                            Inflation = t.Inflation,
                            TrackType = t.TrackType,
                            TrackTypeName = t.ListedTrack.Name,
                            PMT = t.PMT,
                            Rate = t.Rate,
                            Time = t.Time,
                            MonthTaken = t.MonthTaken,
                            YearTaken = t.YearTaken

                        }).ToList();

                        result.Add(offervm);
                    }
                }
                return result;

            }
            catch
            {
                throw new Exception("Could not retrieve offers list");
            }
        }
    }
}
