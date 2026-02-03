import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddFeedback() {
  const { orderId } = useParams();
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comments, setComments] = useState("");

  const submitFeedback = async () => {
    if (!rating) {
      alert("Please select a star rating");
      return;
    }

    if (!user?.userid) {
      alert("User not logged in");
      return;
    }

    const data = {
      userid: user.userid,
      orderid: Number(orderId),
      rating: rating,
      comments: comments
    };

    try {
      await axios.post(
        "http://localhost:5290/api/feedbacks",
        data
      );

      alert("Thank you for your feedback!");
      navigate("/user/viewmenu");

    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h4 className="text-center mb-3">⭐ Rate Your Experience</h4>

        {/* ⭐ STAR RATING */}
        <div className="d-flex justify-content-center mb-3">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              style={{
                fontSize: "30px",
                cursor: "pointer",
                color:
                  (hover || rating) >= star ? "#ffc107" : "#e4e5e9"
              }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        <div className="text-center mb-3">
          {rating > 0 && (
            <small className="text-muted">
              You rated {rating} star{rating > 1 && "s"}
            </small>
          )}
        </div>

        {/* COMMENTS */}
        <label className="fw-bold">Comments</label>
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Share your experience..."
          value={comments}
          onChange={e => setComments(e.target.value)}
        />

        <button
          className="btn btn-success w-100"
          onClick={submitFeedback}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default AddFeedback;
