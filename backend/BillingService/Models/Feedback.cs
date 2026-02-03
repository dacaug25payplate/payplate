using System;
using System.Collections.Generic;

namespace BillingService.Models;

public partial class Feedback
{
    public int Feedbackid { get; set; }

    public int Userid { get; set; }

    public int Orderid { get; set; }

    public int? Rating { get; set; }

    public string? Comments { get; set; }

    public DateTime? Feedbackdate { get; set; }
}
