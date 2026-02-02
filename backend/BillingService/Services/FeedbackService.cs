using BillingService.Models;

namespace BillingService.Services
{
    public class FeedbackService
    {
        private readonly BillingDbContext _context;

        public FeedbackService(BillingDbContext context)
        {
            _context = context;
        }

        public List<Feedback> GetAllFeedbacks()
        {
            return _context.Feedbacks
                .OrderByDescending(f => f.Feedbackdate)
                .ToList();
        }

        // ✅ Save feedback from user
        public Feedback AddFeedback(Feedback feedback)
        {
            feedback.Feedbackdate = DateTime.Now;
            _context.Feedbacks.Add(feedback);
            _context.SaveChanges();
            return feedback;
        }
    }
}
