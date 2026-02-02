using System;
using System.Collections.Generic;

namespace BillingService.Models;

public partial class Discount
{
    public int Discountid { get; set; }

    public double MinAmt { get; set; }

    public double Discount1 { get; set; }

    public DateTime? Startdatetime { get; set; }

    public DateTime? Enddatetime { get; set; }

    public virtual ICollection<Bill> Bills { get; set; } = new List<Bill>();
}
