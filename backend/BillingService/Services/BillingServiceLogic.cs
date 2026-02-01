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

        public Bill GenerateBill(int orderId, double billAmount)
        {
            DateTime now = DateTime.Now;

            // 1️⃣ Calculate tax (5%)
            double tax = billAmount * 0.05;

            // 2️⃣ Find applicable discount
            var discount = _context.Discounts
                .Where(d =>
                    billAmount >= d.MinAmt &&
                    (d.Startdatetime == null || d.Startdatetime <= now) &&
                    (d.Enddatetime == null || d.Enddatetime >= now)
                )
                .OrderByDescending(d => d.MinAmt)
                .FirstOrDefault();

            double discountValue =discount != null ? (billAmount * discount.Discount1 / 100) : 0;


            // 3️⃣ Calculate net amount
            double netAmount = billAmount + tax - discountValue;

            // 4️⃣ Create Bill entity (MATCHES MODEL EXACTLY)
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

            // 5️⃣ Save bill
            _context.Bills.Add(bill);
            _context.SaveChanges();

            return bill;
        }
    }
}
