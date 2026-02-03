import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewBill() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBill();
  }, [orderId]);

  const fetchBill = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5290/api/billing/by-order/${orderId}`
      );
      setBill(res.data);
    } catch (err) {
      setError("Bill not generated yet. Please wait.");
    } finally {
      setLoading(false);
    }
  };

  const payBill = async () => {
    try {
      await axios.put(
        `http://localhost:5290/api/billing/pay/${orderId}`
      );

      await axios.put(
        `http://localhost:8082/orders/release-table/${orderId}`
      );

      alert("Payment successful");
      navigate(`/user/addfeedback/${orderId}`);
    } catch (err) {
      alert("Payment failed");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading Bill...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-warning mt-5 text-center">
        {error}
      </div>
    );
  }

  // ✅ Discount calculation
  const discountAmount =
    bill.billamount + bill.tax - bill.netamount;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow-lg p-4" style={{ width: "420px" }}>
        <h4 className="text-center mb-3">🧾 Invoice</h4>

        <p><b>Order ID:</b> {bill.orderid}</p>
        <p>
          <b>Date:</b>{" "}
          {new Date(bill.generateddate).toLocaleString()}
        </p>

        <hr />

        <div className="d-flex justify-content-between">
          <span>Bill Amount</span>
          <span>₹ {bill.billamount}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Tax</span>
          <span>₹ {bill.tax}</span>
        </div>

        <div className="d-flex justify-content-between text-success">
          <span>Discount</span>
          <span>− ₹ {discountAmount.toFixed(2)}</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between fw-bold fs-5">
          <span>Net Amount</span>
          <span className="text-success">
            ₹ {bill.netamount}
          </span>
        </div>

        <hr />

        <div className="text-center mb-3">
          <span
            className={`badge px-3 py-2 ${
              bill.paymentstatus === "PAID"
                ? "bg-success"
                : "bg-warning"
            }`}
          >
            {bill.paymentstatus}
          </span>
        </div>

        {/* ✅ Centered Pay Button */}
        {bill.paymentstatus === "UNPAID" && (
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-success px-4"
              onClick={payBill}
            >
              Pay Bill
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewBill;
