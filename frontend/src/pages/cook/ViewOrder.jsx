import { useEffect, useState } from "react";
import axios from "axios";

function ViewOrder() {

  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatusId, setSelectedStatusId] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchStatuses();
    fetchMenu();
  }, []);

  // ================= API CALLS =================
  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:8080/orders/kitchen");

    // FIFO + hide READY & DELIVERED
    const queuedOrders = res.data
      .filter(o => o.status !== "READY" && o.status !== "DELIVERED")
      .sort((a, b) => a.orderId - b.orderId);

    setOrders(queuedOrders);
  };

  const fetchStatuses = async () => {
    const res = await axios.get(
      "http://localhost:8080/orders/getAllOrderStatus"
    );

    // Only cook-allowed statuses
    const cookStatuses = res.data
      .filter(s => s.statusname !== "DELIVERED")
      .sort((a, b) => {
        const order = {
          PENDING: 1,
          IN_PREPARATION: 2,
          READY: 3
        };
        return order[a.statusname] - order[b.statusname];
      });

    setStatuses(cookStatuses);
  };

  const fetchMenu = async () => {
    const res = await axios.get("http://localhost:8080/Menu/getAllMenu");
    setMenuList(res.data);
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async () => {
    await axios.put("http://localhost:8080/orders/updateStatus", {
      orderid: selectedOrder.orderId,
      orderstatusid: selectedStatusId
    });

    setSelectedOrder(null);
    fetchOrders();
  };

  // ================= HELPERS =================
  const getBadgeClass = (status) => {
    switch (status) {
      case "PENDING": return "bg-warning";
      case "IN_PREPARATION": return "bg-primary";
      case "READY": return "bg-success";
      default: return "bg-secondary";
    }
  };

  const getImage = (menuName) => {
    const found = menuList.find(m => m.menuname === menuName);
    return found
      ? `http://localhost:8080${found.imageUrl}`
      : "https://via.placeholder.com/80";
  };

  // ================= UI =================
  return (
    <div className="container mt-4">

      <h4 className="mb-4">🍳 Kitchen Orders</h4>

      {/* ORDER QUEUE */}
      <div className="row">
        {orders.map((order, index) => {
          const isFirst = index === 0;

          return (
            <div key={order.orderId} className="col-md-3 mb-4">
              <div
                className={`card shadow-sm h-100 ${
                  isFirst ? "border border-success border-3" : ""
                }`}
                style={{
                  cursor: "pointer",
                  borderRadius: "14px",
                  backgroundColor: isFirst ? "#e9fbe9" : "white"
                }}
                onClick={() => {
                  setSelectedOrder(order);
                  setSelectedStatusId(order.orderstatusid);
                }}
              >
                <div className="card-body">
                  <h6 className="fw-bold">Table {order.tableId}</h6>
                  <p className="mb-1">Order #{order.orderId}</p>

                  <span className={`badge ${getBadgeClass(order.status)}`}>
                    {order.status}
                  </span>

                  <p className="text-muted mt-2 mb-0">
                    {order.items.length} items
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= MODAL ================= */}
      {selectedOrder && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">

              {/* HEADER */}
              <div className="modal-header">
                <h5>
                  Order #{selectedOrder.orderId} | Table {selectedOrder.tableId}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedOrder(null)}
                />
              </div>

              {/* BODY */}
              <div
                className="modal-body"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {selectedOrder.items.map((item, i) => (
                  <div
                    key={i}
                    className="d-flex align-items-center border-bottom pb-3 mb-3"
                  >
                    <img
                      src={getImage(item.menuName)}
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

export default ViewOrder;
