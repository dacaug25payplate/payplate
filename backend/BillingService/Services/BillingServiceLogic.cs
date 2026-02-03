using BillingService.Models;

namespace BillingService.Services
{
    public class BillingServiceLogic
    {
        private readonly BillingDbContext _context;

        public BillingServiceLogic(BillingDbContext context)
        {
            _context = context;
        }

        // ✅ Generate bill ONLY ONCE
        public Bill GenerateBill(int orderId, double billAmount)
        {
            // 🚫 Prevent duplicate bill
            var existing = _context.Bills
                .FirstOrDefault(b => b.Orderid == orderId);

            if (existing != null)
                throw new Exception("Bill already generated");

            DateTime now = DateTime.Now;

            // 1️⃣ Tax (5%)
            double tax = billAmount * 0.05;

            // 2️⃣ Discount logic
            var discount = _context.Discounts
                .Where(d =>
                    billAmount >= d.MinAmt &&
                    (d.Startdatetime == null || d.Startdatetime <= now) &&
                    (d.Enddatetime == null || d.Enddatetime >= now)
                )
                .OrderByDescending(d => d.MinAmt)
                .FirstOrDefault();

            double discountValue =
                discount != null
                ? billAmount * discount.Discount1 / 100
                : 0;

            // 3️⃣ Net amount
            double netAmount = billAmount + tax - discountValue;

            // 4️⃣ Save bill
            var bill = new Bill
            {
                Orderid = orderId,
                Generateddate = now,
                Billamount = billAmount,
                Tax = tax,
                Discountid = discount?.Discountid,
                Netamount = netAmount,
                Paymentstatus = "UNPAID"
            };

            _context.Bills.Add(bill);
            _context.SaveChanges();

            return bill;
        }

        // ✅ View bill anytime
        public Bill GetBillByOrderId(int orderId)
        {
            return _context.Bills
                .FirstOrDefault(b => b.Orderid == orderId)
                ?? throw new Exception("Bill not found");
        }

        // ✅ Used by Admin UI
        public Dictionary<int, string> GetPaymentStatusMap()
        {
            return _context.Bills
                .ToDictionary(b => b.Orderid, b => b.Paymentstatus);
        }

        
    }
}
