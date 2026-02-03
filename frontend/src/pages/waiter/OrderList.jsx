import { useEffect, useState } from "react";
import axios from "axios";

function OrderList() {

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

    // ---------------- API CALLS ----------------
    const fetchOrders = async () => {
        const res = await axios.get("http://localhost:8080/orders/kitchen");
        setOrders(res.data);
    };

    const fetchStatuses = async () => {
        const res = await axios.get(
            "http://localhost:8080/orders/getAllOrderStatus"
        );
        setStatuses(res.data);
    };

    const fetchMenu = async () => {
        const res = await axios.get("http://localhost:8080/Menu/getAllMenu");
        setMenuList(res.data);
    };

    // ---------------- UPDATE STATUS ----------------
    const updateStatus = async () => {
        await axios.put(`http://localhost:8080/orders/updateStatus`, {
            orderid: selectedOrder.orderId,
            orderstatusid: selectedStatusId
        });

        setSelectedOrder(null);
        fetchOrders();
    };

    // ---------------- HELPERS ----------------
    const getStatusName = (status) => status || "PENDING";

    const getBadgeClass = (status) => {
        switch (status) {
            case "PENDING": return "bg-warning";
            case "IN PREPARATION": return "bg-primary";
            case "READY": return "bg-success";
            case "DELIVERED": return "bg-dark";
            default: return "bg-secondary";
        }
    };

    const getImage = (menuName) => {
        const found = menuList.find(m => m.menuname === menuName);
        return found
            ? `http://localhost:8080${found.imageUrl}`
            : `https://via.placeholder.com/80`;
    };

    const readyOrders = orders
        .filter(order => order.status === "READY")
        .sort(
            (a, b) =>
                new Date(a.orderDateTime) - new Date(b.orderDateTime)
        );

    return (
        <div className="container mt-4">

            <h4 className="mb-4">
                Ready Orders ({orders.filter(o => o.status === "READY").length})
            </h4>

            {/* ORDER CARDS (UNCHANGED) */}
            <div className="row">
                {readyOrders.map((order, index) => (
                    <div key={order.orderId} className="col-md-3 mb-4">
                        <div
                            className={`card shadow-sm h-100 ${index === 0 ? "border border-success border-3" : ""
                                }`}
                            style={{
                                cursor: "pointer",
                                borderRadius: "14px",
                                backgroundColor: index === 0 ? "#e9fbe9" : "white"
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
                ))}
            </div>

            {/* ================= MODAL ================= */}
            {selectedOrder && (
                <div className="modal fade show d-block"
                    style={{ background: "rgba(0,0,0,0.6)" }}>

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

                            {/* BODY (3 ITEMS VISIBLE + SCROLL) */}
                            <div className="modal-body"
                                style={{ maxHeight: "300px", overflowY: "auto" }}>

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
                                    disabled={selectedOrder.status !== "READY"}
                                    onChange={(e) => setSelectedStatusId(Number(e.target.value))}
                                >
                                    <option value="">-- Select Status --</option>

                                    {statuses
                                        .filter(s => s.statusname === "DELIVERED")
                                        .map(s => (
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

export default OrderList;