using BillingService.Models;

namespace BillingService.Services
{
    public class DiscountService
    {
        private readonly BillingDbContext _context;

        public DiscountService(BillingDbContext context)
        {
            _context = context;
        }

        public Discount AddDiscount(Discount discount)
        {
            _context.Discounts.Add(discount);
            _context.SaveChanges();
            return discount;
        }

        public List<Discount> GetAllDiscounts()
        {
            return _context.Discounts
                .OrderByDescending(d => d.Discountid)
                .ToList();
        }

        public Discount? GetById(int id)
        {
            return _context.Discounts.FirstOrDefault(d => d.Discountid == id);
        }

        public void Delete(int id)
        {
            var discount = _context.Discounts.FirstOrDefault(d => d.Discountid == id);
            if (discount != null)
            {
                _context.Discounts.Remove(discount);
                _context.SaveChanges();
            }
        }
    }
}
