import { useEffect, useState } from "react";
import axios from "axios";

function AdminViewFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState({}); // userid → username
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  const FEEDBACK_API = "http://localhost:5290/api/feedbacks";

  const fetchUserName = async (userId) => {
    if (users[userId]) return;

    try {
      const res = await axios.get(
        `http://localhost:8080/api/user/getusername/${userId}`
      );

      setUsers(prev => ({
        ...prev,
        [userId]: res.data // plain text username
      }));
    } catch (err) {
      console.error("Username fetch failed", err);
      setUsers(prev => ({
        ...prev,
        [userId]: "Unknown User"
      }));
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(FEEDBACK_API);

      const sorted = [...res.data].sort(
        (a, b) => new Date(b.feedbackdate) - new Date(a.feedbackdate)
      );

      setFeedbacks(sorted);

      // Fetch usernames
      sorted.forEach(f => fetchUserName(f.userid));
    } catch (err) {
      console.error("Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    const interval = setInterval(fetchFeedbacks, 50000);
    return () => clearInterval(interval);
  }, []);

  const toggleExpand = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderComment = (feedback) => {
    if (!feedback.comments) return "-";

    const isExpanded = expanded[feedback.feedbackid];
    const text = feedback.comments;

    if (text.length <= 120) return text;

    return (
      <>
        {isExpanded ? text : text.substring(0, 120) + "..."}
        <span
          className="ms-2 text-primary"
          style={{ cursor: "pointer", fontSize: "13px" }}
          onClick={() => toggleExpand(feedback.feedbackid)}
        >
          {isExpanded ? "Less" : "More"}
        </span>
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Admin – Customer Feedbacks</h4>

      {loading ? (
        <p>Loading feedbacks...</p>
      ) : feedbacks.length === 0 ? (
        <div className="alert alert-info">No feedbacks available</div>
      ) : (
        <div className="row">
          {feedbacks.map(f => (
            <div className="col-md-6 mb-3" key={f.feedbackid}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <span className="badge bg-secondary me-2">
                        {users[f.userid] || "Loading..."}
                      </span>

                      <span className="badge bg-info">
                        Order #{f.orderid}
                      </span>
                    </div>
                    <span className="badge bg-success">
                      {f.rating ? `${f.rating} ★` : "No Rating"}
                    </span>
                  </div>

                  <p className="mb-2" style={{ fontSize: "14px" }}>
                    {renderComment(f)}
                  </p>

                  <small className="text-muted">
                    {f.feedbackdate
                      ? new Date(f.feedbackdate).toLocaleString()
                      : "-"}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminViewFeedbacks;
