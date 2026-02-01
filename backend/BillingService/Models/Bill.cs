using System;
using System.Collections.Generic;

namespace BillingService.Models;

public partial class Bill
{
    public int Billid { get; set; }

    public int Orderid { get; set; }

    public DateTime Generateddate { get; set; }

    public double Billamount { get; set; }

    public double Tax { get; set; }

    public int? Discountid { get; set; }

    public double Netamount { get; set; }

    public string Paymentstatus { get; set; } = null!;

    public virtual Discount? Discount { get; set; }
}
