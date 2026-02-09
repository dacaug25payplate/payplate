import { useEffect, useState, useRef } from "react";
import axios from "axios";

function AdminViewOrders() {

    const [orders, setOrders] = useState([]);
    const [paymentStatusMap, setPaymentStatusMap] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);

    const intervalRef = useRef(null);

    const STATUS_PRIORITY = {
        DELIVERED: 1,
        READY: 2,
        IN_PREPARATION: 3,
        PENDING: 4
    };

    useEffect(() => {
        loadData();

        intervalRef.current = setInterval(loadData, 5000);
        return () => clearInterval(intervalRef.current);
    }, []);


    // ---------------- LOAD DATA ----------------
    const loadData = async () => {
        await Promise.all([
            fetchOrders(),
            fetchPaymentStatuses()
        ]);
    };

    // ---------------- API CALLS ----------------
    const fetchOrders = async () => {
        const res = await axios.get("http://localhost:8080/orders/kitchen");
        setOrders(sortOrders(res.data));
    };

    const fetchPaymentStatuses = async () => {
        const res = await axios.get(
            "http://localhost:5290/api/billing/status-map"
        );
        setPaymentStatusMap(res.data);
    };

   const generateBill = async (order) => {
    const billAmount = order.totalAmount;

    if (!billAmount || billAmount <= 0) {
        alert("Invalid bill amount");
        return;
    }

    try {
        await axios.post(
            "http://localhost:5290/api/billing/generate",
            null,
            {
                params: {
                    orderId: order.orderId,
                    billAmount
                }
            }
        );

        alert(`Bill generated for Order #${order.orderId}`);
        setSelectedOrder(null);
        loadData(); // 🔄 refresh orders & payment status

    } catch (err) {
        console.error("Generate bill error:", err);

        let message = "Failed to generate bill";

        if (err.response?.data?.message) {
            message = err.response.data.message;
        }

        alert(message);
    }
};


    const getPaymentBadge = (paymentStatus) => {
        if (paymentStatus === "PAID")
            return <span className="badge bg-success ms-2">PAID</span>;

        if (paymentStatus === "UNPAID")
            return <span className="badge bg-warning text-dark ms-2">UNPAID</span>;

        return <span className="badge bg-secondary ms-2">NO BILL</span>;
    };



    // ---------------- HELPERS ----------------
    const sortOrders = (list) =>
        [...list].sort(
            (a, b) =>
                (STATUS_PRIORITY[a.status] || 99) -
                (STATUS_PRIORITY[b.status] || 99)
        );

    const getBadgeClass = (status) => {
        switch (status) {
            case "DELIVERED": return "bg-dark";
            case "READY": return "bg-success";
            case "IN_PREPARATION": return "bg-primary";
            case "PENDING": return "bg-warning";
            default: return "bg-secondary";
        }
    };

    // ---------------- UI ----------------
    return (
        <div className="container mt-4">
            <h4 className="mb-4">📦 Orders Overview</h4>

            <div className="row">
                {orders.map(order => {

                    const paymentStatus = paymentStatusMap[order.orderId];

                    const isVisibleToAdmin = paymentStatus !== "PAID";
                    if (!isVisibleToAdmin) return null;

                    return (
                        <div key={order.orderId} className="col-md-3 mb-4">
                            <div
                                className="card shadow-sm h-100"
                                style={{ borderRadius: "14px", cursor: "pointer" }}
                                onClick={() => setSelectedOrder(order)}
                            >
                                <div className="card-body">
                                    <h6 className="fw-bold">Table {order.tableId}</h6>
                                    <p className="mb-1">Order #{order.orderId}</p>

                                    <div>
                                        <span className={`badge ${getBadgeClass(order.status)}`}>
                                            {order.status}
                                        </span>

                                        {getPaymentBadge(paymentStatus)}
                                    </div>


                                    <p className="text-muted mt-2">
                                        {order.items?.length || 0} items
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MODAL */}
            {selectedOrder && (() => {

                const paymentStatus = paymentStatusMap[selectedOrder.orderId];
                const showGenerateButton = selectedOrder.status === "DELIVERED";
                const enableGenerateButton = paymentStatus === undefined;

                return (
                    <div className="modal show fade d-block"
                        style={{ background: "rgba(0,0,0,0.6)" }}>
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Order #{selectedOrder.orderId} | Table {selectedOrder.tableId}
                                    </h5>
                                    <button
                                        className="btn-close"
                                        onClick={() => setSelectedOrder(null)}
                                    />
                                </div>

                                <div className="modal-body">
                                    {selectedOrder.items.map((item, i) => (
                                        <div key={i}
                                            className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                            <span>{item.menuName}</span>
                                            <span>Qty: {item.quantity}</span>
                                        </div>
                                    ))}
                                </div>


                                <div className="modal-footer">
                                    {showGenerateButton && (
                                        <button
                                            className="btn btn-success w-100"
                                            disabled={!enableGenerateButton}
                                            onClick={() => generateBill(selectedOrder)}
                                        >
                                            {paymentStatus === "UNPAID"
                                                ? "Waiting for Payment"
                                                : "Generate Bill"}
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

export default AdminViewOrders;