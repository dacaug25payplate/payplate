using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace BillingService.Models;

public partial class BillingDbContext : DbContext
{
    public BillingDbContext()
    {
    }

    public BillingDbContext(DbContextOptions<BillingDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Bill> Bills { get; set; }

    public virtual DbSet<Discount> Discounts { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Bill>(entity =>
        {
            entity.HasKey(e => e.Billid).HasName("PRIMARY");

            entity.ToTable("bills");

            entity.HasIndex(e => e.Discountid, "fk_bills_discount");

            entity.Property(e => e.Billid).HasColumnName("billid");
            entity.Property(e => e.Billamount).HasColumnName("billamount");
            entity.Property(e => e.Discountid).HasColumnName("discountid");
            entity.Property(e => e.Generateddate)
                .HasColumnType("datetime")
                .HasColumnName("generateddate");
            entity.Property(e => e.Netamount).HasColumnName("netamount");
            entity.Property(e => e.Orderid).HasColumnName("orderid");
            entity.Property(e => e.Paymentstatus)
                .HasMaxLength(10)
                .HasDefaultValueSql("'unpaid'")
                .HasColumnName("paymentstatus");
            entity.Property(e => e.Tax).HasColumnName("tax");

            entity.HasOne(d => d.Discount).WithMany(p => p.Bills)
                .HasForeignKey(d => d.Discountid)
                .HasConstraintName("fk_bills_discount");
        });

        modelBuilder.Entity<Discount>(entity =>
        {
            entity.HasKey(e => e.Discountid).HasName("PRIMARY");

            entity.ToTable("discount");

            entity.Property(e => e.Discountid).HasColumnName("discountid");
            entity.Property(e => e.Discount1).HasColumnName("discount");
            entity.Property(e => e.Enddatetime)
                .HasColumnType("datetime")
                .HasColumnName("enddatetime");
            entity.Property(e => e.MinAmt).HasColumnName("min_amt");
            entity.Property(e => e.Startdatetime)
                .HasColumnType("datetime")
                .HasColumnName("startdatetime");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Feedbackid).HasName("PRIMARY");

            entity.ToTable("feedback");

            entity.Property(e => e.Feedbackid).HasColumnName("feedbackid");
            entity.Property(e => e.Comments)
                .HasMaxLength(255)
                .HasColumnName("comments");
            entity.Property(e => e.Feedbackdate)
                .HasColumnType("datetime")
                .HasColumnName("feedbackdate");
            entity.Property(e => e.Orderid).HasColumnName("orderid");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.Userid).HasColumnName("userid");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
