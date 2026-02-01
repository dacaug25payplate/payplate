import { useEffect, useState } from "react";
import axios from "axios";

function AdminViewOrders() {

  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatusId, setSelectedStatusId] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchStatuses();
  }, []);

  // ---------------- API CALLS ----------------
  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:8082/orders/kitchen");
    setOrders(res.data);
  };

  const fetchStatuses = async () => {
    const res = await axios.get("http://localhost:8082/orders/getAllOrderStatus");
    setStatuses(res.data);
  };

  const updateStatus = async () => {
    await axios.put(
      `http://localhost:8082/orders/${selectedOrder.orderId}/status`,
      { orderstatusid: selectedStatusId }
    );
    setSelectedOrder(null);
    fetchOrders();
  };

  // ---------------- HELPERS ----------------
  const getStatusName = (orderstatusid) => {
    const found = statuses.find(
      s => s.orderstatusid === orderstatusid
    );
    return found ? found.statusname : "PENDING";
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "PENDING": return "bg-warning";
      case "IN_PREPARATION": return "bg-primary";
      case "READY": return "bg-success";
      case "DELIVERED": return "bg-dark";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="container mt-4">

      <h4 className="mb-4">🍳 Kitchen Orders</h4>

      {/* ORDER CARDS */}
      <div className="row">
        {orders.map(order => {
          const statusName = getStatusName(order.orderstatusid);

          return (
            <div key={order.orderId} className="col-md-3 mb-4">
              <div
                className="card shadow-sm h-100"
                style={{ cursor: "pointer", borderRadius: "14px" }}
                onClick={() => {
                  setSelectedOrder(order);
                  setSelectedStatusId(order.orderstatusid);
                }}
              >
                <div className="card-body">
                  <h6 className="fw-bold">Table {order.tableId}</h6>
                  <p className="mb-1">Order #{order.orderId}</p>

                  <span className={`badge ${getBadgeClass(statusName)}`}>
                    {statusName}
                  </span>

                  <p className="text-muted mt-2 mb-0">
                    {order.items?.length || 0} items
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div
          className="modal show fade d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">

              {/* HEADER */}
              <div className="modal-header">
                <h5 className="modal-title">
                  Order #{selectedOrder.orderId} | Table {selectedOrder.tableId}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                ></button>
              </div>

              {/* BODY */}
              <div className="modal-body">
                {selectedOrder.items.map((item, i) => (
                  <div
                    key={i}
                    className="d-flex align-items-center border-bottom pb-3 mb-3"
                  >
                    <img
                      src={
                        item.imageUrl
                          ? `http://localhost:8081${item.imageUrl}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={item.menuName}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "10px"
                      }}
                    />

                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-1">{item.menuName}</h6>
                      <span className="fw-bold">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="modal-footer justify-content-between">

                {/* STATUS DROPDOWN */}
                <select
                  className="form-select w-50"
                  value={selectedStatusId}
                  onChange={(e) =>
                    setSelectedStatusId(Number(e.target.value))
                  }
                >
                  {statuses.map(s => (
                    <option
                      key={s.orderstatusid}
                      value={s.orderstatusid}
                    >
                      {s.statusname}
                    </option>
                  ))}
                </select>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedOrder(null)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-success"
                    onClick={updateStatus}
                  >
                    Update Status
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminViewOrders;