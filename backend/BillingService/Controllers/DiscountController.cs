using BillingService.Models;
using BillingService.Services;
using Microsoft.AspNetCore.Mvc;

namespace BillingService.Controllers
{
    [ApiController]
    [Route("api/discounts")]
    public class DiscountController : ControllerBase
    {
        private readonly DiscountService _discountService;

        public DiscountController(DiscountService discountService)
        {
            _discountService = discountService;
        }

        // ✅ ADD DISCOUNT (Admin)
        [HttpPost]
        public IActionResult AddDiscount([FromBody] Discount discount)
        {
            if (discount.MinAmt <= 0 || discount.Discount1 <= 0)
            {
                return BadRequest("Invalid discount data");
            }

            discount.Startdatetime ??= DateTime.Now;
            discount.Enddatetime ??= DateTime.Now.AddYears(1);

            var saved = _discountService.AddDiscount(discount);
            return Ok(saved);
        }

        // ✅ GET ALL DISCOUNTS (Admin)
        [HttpGet]
        public IActionResult GetAllDiscounts()
        {
            return Ok(_discountService.GetAllDiscounts());
        }

        // ✅ DELETE DISCOUNT (Admin)
        [HttpDelete("{id}")]
        public IActionResult DeleteDiscount(int id)
        {
            var discount = _discountService.GetById(id);
            if (discount == null)
            {
                return NotFound("Discount not found");
            }

            _discountService.Delete(id);
            return NoContent(); // 204
        }
    }
}
