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
            // ❗ Prevent duplicate bill
            var existingBill = _context.Bills
                .FirstOrDefault(b => b.Orderid == orderId);

            if (existingBill != null)
            {
                throw new InvalidOperationException("Bill already generated for this order");
            }

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

            double discountValue =
                discount != null ? (billAmount * discount.Discount1 / 100) : 0;

            // 3️⃣ Net amount
            double netAmount = billAmount + tax - discountValue;

            // 4️⃣ Create bill
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

         public Dictionary<int, string> GetPaymentStatusMap()
        {
            return _context.Bills
                .GroupBy(b => b.Orderid)
                .Select(g => g.OrderByDescending(b => b.Billid).First())
                .ToDictionary(
                    b => b.Orderid,
                    b => b.Paymentstatus
                );
        }
    }
}
