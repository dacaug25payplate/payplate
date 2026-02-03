import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function AddFeedback({ orderId }) {
  const user = useSelector(state => state.user.user);

  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5290/api/feedbacks";

  const submitFeedback = async () => {
    if (!rating) {
      alert("Please give a rating");
      return;
    }

    setLoading(true);

    const data = {
      userid: user.userid,
      orderid: orderId,
      rating: Number(rating),
      comments: comments
    };

    try {
      await axios.post(API_URL, data);
      alert("Thank you for your feedback!");

      setRating("");
      setComments("");
    } catch (err) {
      alert("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mt-3 shadow-sm">
      <h5 className="mb-3">Rate Your Experience</h5>

      {/* Rating */}
      <label className="fw-bold">Rating</label>
      <select
        className="form-select mb-3"
        value={rating}
        onChange={e => setRating(e.target.value)}
      >
        <option value="">Select Rating</option>
        <option value="1">1 ★</option>
        <option value="2">2 ★★</option>
        <option value="3">3 ★★★</option>
        <option value="4">4 ★★★★</option>
        <option value="5">5 ★★★★★</option>
      </select>

      {/* Comments */}
      <label className="fw-bold">Comments (optional)</label>
      <textarea
        className="form-control mb-3"
        rows="3"
        placeholder="Share your experience..."
        value={comments}
        onChange={e => setComments(e.target.value)}
      />

      <button
        className="btn btn-success"
        onClick={submitFeedback}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </div>
  );
}

export default AddFeedback;
