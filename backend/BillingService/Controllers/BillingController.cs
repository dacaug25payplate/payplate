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

        [HttpPost("generate")]
        public IActionResult GenerateBill(
            [FromQuery] int orderId,
            [FromQuery] double billAmount)
        {
            try
            {
                var bill = _billingService.GenerateBill(orderId, billAmount);
                return Ok(bill);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong while generating bill");
            }
        }

        [HttpGet("status-map")]
        public IActionResult GetPaymentStatusMap()
        {
            var map = _billingService.GetPaymentStatusMap();
            return Ok(map);
        }
    }
}
