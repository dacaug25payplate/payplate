using BillingService.Models;
using BillingService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BillingService.Controllers
{
    [ApiController]
    [Route("api/billing")]
    public class BillingController : ControllerBase
    {
        private readonly BillingServiceLogic _billingService;
        private readonly BillingDbContext _context;

        public BillingController(BillingServiceLogic billingService, BillingDbContext context)
        {
            _billingService = billingService;
            _context = context;
        }

        // =======================
        // 1️⃣ Generate Bill
        // =======================
        [HttpPost("generate")]
        public IActionResult GenerateBill([FromQuery] int orderId, [FromQuery] double billAmount)
        {
            // prevent duplicate bill
            bool exists = _context.Bills.Any(b => b.Orderid == orderId);
            if (exists)
                return BadRequest("Bill already generated");

            var bill = _billingService.GenerateBill(orderId, billAmount);
            return Ok(bill);
        }

        // =======================
        // 2️⃣ Get Bill by OrderId (FOR VIEW BILL)
        // =======================
        [HttpGet("by-order/{orderId}")]
        public IActionResult GetBillByOrder(int orderId)
        {
            var bill = _context.Bills.FirstOrDefault(b => b.Orderid == orderId);

            if (bill == null)
                return NotFound("Bill not generated yet");

            return Ok(bill);
        }

        // =======================
        // 3️⃣ Payment Status Map (ADMIN)
        // =======================
        [HttpGet("status-map")]
        public IActionResult GetPaymentStatusMap()
        {
            var map = _context
                .Bills.GroupBy(b => b.Orderid)
                .ToDictionary(
                    g => g.Key,
                    g =>
                        g.OrderByDescending(b => b.Billid) // latest bill
                            .First()
                            .Paymentstatus
                );

            return Ok(map);
        }

        // =======================
        // 4️⃣ Mark Bill as PAID
        // =======================
        [HttpPut("pay/{orderId}")]
        public IActionResult PayBill(int orderId)
        {
            var bill = _context.Bills.FirstOrDefault(b => b.Orderid == orderId);

            if (bill == null)
                return NotFound("Bill not found");

            bill.Paymentstatus = "PAID";
            _context.SaveChanges();

            return Ok("Payment successful");
        }
    }
}
