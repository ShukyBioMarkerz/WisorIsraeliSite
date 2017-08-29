﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class Shrink2FitEntities : DbContext
    {
        public Shrink2FitEntities()
            : base("name=Shrink2FitEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<BankOfIsraelInterestRate> BankOfIsraelInterestRates { get; set; }
        public DbSet<BankOfIsraelInterestType> BankOfIsraelInterestTypes { get; set; }
        public DbSet<ChangePreference> ChangePreferences { get; set; }
        public DbSet<CPITable> CPITables { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<DealType> DealTypes { get; set; }
        public DbSet<Execution> Executions { get; set; }
        public DbSet<ExecutionStatu> ExecutionStatus { get; set; }
        public DbSet<IndexType> IndexTypes { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<ListBank> ListBanks { get; set; }
        public DbSet<ListedTrack> ListedTracks { get; set; }
        public DbSet<ObligationOrFuture> ObligationOrFutures { get; set; }
        public DbSet<OffersOrCheck> OffersOrChecks { get; set; }
        public DbSet<RelationshipType> RelationshipTypes { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Saving> Savings { get; set; }
        public DbSet<SavingsType> SavingsTypes { get; set; }
        public DbSet<TrackInterestRate> TrackInterestRates { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserStatus> UserStatus { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderStatus> OrderStatus { get; set; }
        public DbSet<ResultEntry> ResultEntries { get; set; }
        public DbSet<ResultTrack> ResultTracks { get; set; }
        public DbSet<MailTemplate> MailTemplates { get; set; }
    }
}
