import { useEffect, useState } from "react";
import axios from "axios";

function AddDiscount() {
  const [minAmt, setMinAmt] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [discounts, setDiscounts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5290/api/discounts";

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    const res = await axios.get(API_URL);
    setDiscounts(res.data);
  };

  const validateForm = () => {
    if (!minAmt || Number(minAmt) <= 0) {
      return "Minimum bill amount must be greater than 0";
    }

    if (!discountPercent || discountPercent < 1 || discountPercent > 99) {
      return "Discount must be between 1% and 99%";
    }

    if (startDateTime && endDateTime) {
      if (new Date(startDateTime) > new Date(endDateTime)) {
        return "Start date cannot be after end date";
      }
    }

    return "";
  };

  const submitDiscount = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    const data = {
      minAmt: Number(minAmt),
      discount1: Number(discountPercent),
      startdatetime: startDateTime || null,
      enddatetime: endDateTime || null
    };

    try {
      await axios.post(API_URL, data);
      alert("Discount added successfully");

      setMinAmt("");
      setDiscountPercent("");
      setStartDateTime("");
      setEndDateTime("");

      fetchDiscounts();
    } catch {
      alert("Failed to add discount");
    } finally {
      setLoading(false);
    }
  };

  const deleteDiscount = async (id) => {
    if (!window.confirm("Are you sure you want to delete this discount?")) {
      return;
    }

    await axios.delete(`${API_URL}/${id}`);
    fetchDiscounts();
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Admin – Discount Management</h4>

      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "40px" }}   // ⬆️ controls how high from top
      >
        <div style={{ width: "100%", maxWidth: "500px" }}>

          {/* 🔽 YOUR EXISTING CARD (UNCHANGED) */}
          <div className="card p-3 mb-4 shadow-sm">
            {error && <div className="alert alert-danger py-2">{error}</div>}

            <label className="fw-bold">Minimum Bill Amount (₹)</label>
            <input
              type="number"
              className="form-control mb-2"
              value={minAmt}
              min="1"
              onChange={e => setMinAmt(e.target.value)}
            />

            <label className="fw-bold">Discount Percentage (%)</label>
            <input
              type="number"
              className="form-control mb-2"
              value={discountPercent}
              min="1"
              max="99"
              onChange={e => {
                const value = e.target.value;
                if (value.length <= 2) {
                  setDiscountPercent(value);
                }
              }}
              placeholder="1–99%"
            />

            <label className="fw-bold">Start Date & Time</label>
            <input
              type="datetime-local"
              className="form-control mb-2"
              value={startDateTime}
              onChange={e => setStartDateTime(e.target.value)}
              onKeyDown={e => e.preventDefault()}
            />

            <label className="fw-bold">End Date & Time</label>
            <input
              type="datetime-local"
              className="form-control mb-3"
              value={endDateTime}
              onChange={e => setEndDateTime(e.target.value)}
              onKeyDown={e => e.preventDefault()}
            />

            <button
              className="btn btn-success w-100"
              onClick={submitDiscount}
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Discount"}
            </button>
          </div>

        </div>
      </div>


      <h5>Existing Discounts</h5>

      <table className="table table-bordered table-sm mt-2">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Min Amount (₹)</th>
            <th>Discount (%)</th>
            <th>Start</th>
            <th>End</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map(d => (
            <tr key={d.discountid}>
              <td>{d.discountid}</td>
              <td>{d.minAmt}</td>
              <td>{d.discount1}%</td>
              <td>{d.startdatetime ? new Date(d.startdatetime).toLocaleString() : "-"}</td>
              <td>{d.enddatetime ? new Date(d.enddatetime).toLocaleString() : "-"}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteDiscount(d.discountid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddDiscount;
