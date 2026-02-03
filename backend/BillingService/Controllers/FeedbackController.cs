using BillingService.Services;
using BillingService.Models;
using Microsoft.AspNetCore.Mvc;

namespace BillingService.Controllers
{
    [ApiController]
    [Route("api/feedbacks")]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _feedbackService;

        public FeedbackController(FeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        /// <summary>
        /// Admin - View all feedbacks
        /// </summary>
        [HttpGet]
        public IActionResult GetAllFeedbacks()
        {
            return Ok(_feedbackService.GetAllFeedbacks());
        }

        // ✅ USER: Submit feedback
        [HttpPost]
        public IActionResult SubmitFeedback([FromBody] Feedback feedback)
        {
            if (feedback.Userid <= 0 || feedback.Orderid <= 0)
                return BadRequest("Invalid user or order");

            var saved = _feedbackService.AddFeedback(feedback);
            return Ok(saved);
        }
    }
}
