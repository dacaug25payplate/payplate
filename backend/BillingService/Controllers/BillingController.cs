using BillingService.Services;
using Microsoft.AspNetCore.Mvc;

namespace BillingService.Controllers
{
    [ApiController]
    [Route("api/billing")]
    public class BillingController : ControllerBase
    {
        private readonly BillingServiceLogic _billingService;

        public BillingController(BillingServiceLogic billingService)
        {
            _billingService = billingService;
        }

        /// <summary>
        /// Admin generates bill for an order
        /// </summary>
        [HttpPost("generate")]
        public IActionResult GenerateBill(
            [FromQuery] int orderId,
            [FromQuery] double billAmount)
        {
            var bill = _billingService.GenerateBill(orderId, billAmount);
            return Ok(bill);
        }
    }
}
