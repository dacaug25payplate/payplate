import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserOrders() {
  const navigate = useNavigate();
  const userId = useSelector(s => s.user.user?.userid);

  const [orders, setOrders] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [workingItems, setWorkingItems] = useState([]);

  // ================= FETCH =================
  useEffect(() => {
    if (userId) {
      fetchOrders();
      fetchMenu();
    }
  }, [userId]);

  const fetchOrders = async () => {
    const res = await axios.get(
      `http://localhost:8082/orders/user/${userId}`
    );

    const sorted = res.data
      .sort((a, b) => new Date(b.orderdatetime) - new Date(a.orderdatetime))
      .map(o => ({
        ...o,
        orderItems: o.orderItems.map(i => ({
          ...i,
          originalQty: i.quantity,
          price: i.totaldishprice / i.quantity // ✅ FIX NaN
        }))
      }));

    setOrders(sorted);
  };

  const fetchMenu = async () => {
    const res = await axios.get("http://localhost:8081/api/getAllMenu");
    setMenuList(res.data);
  };

  // ================= OPEN ORDER =================
  const openOrder = (order) => {
    const mergedItems = order.orderItems.map(item => {
      const menu = menuList.find(m => m.menuid === item.menuid);
      return {
        ...item,
        imageUrl: menu?.imageUrl || "",
        menuname: menu?.menuname || item.menuname
      };
    });

    setActiveOrder(order);
    setWorkingItems(JSON.parse(JSON.stringify(mergedItems)));
  };

  // ================= ITEM LOGIC =================
  const increase = (menu) => {
    setWorkingItems(prev => {
      const item = prev.find(i => i.menuid === menu.menuid);

      if (item) {
        return prev.map(i =>
          i.menuid === menu.menuid
            ? {
              ...i,
              quantity: i.quantity + 1,
              totaldishprice: (i.quantity + 1) * i.price
            }
            : i
        );
      }

      return [
        ...prev,
        {
          menuid: menu.menuid,
          menuname: menu.menuname,
          imageUrl: menu.imageUrl,
          price: menu.price,
          quantity: 1,
          originalQty: 0,
          totaldishprice: menu.price
        }
      ];
    });
  };

  const decrease = (menuid) => {
    setWorkingItems(prev =>
      prev
        .map(i =>
          i.menuid === menuid
            ? {
              ...i,
              quantity: i.quantity - 1,
              totaldishprice: (i.quantity - 1) * i.price
            }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  // ================= UPDATE ORDER =================
  const updateOrder = async () => {

    // ✅ ADD THIS BLOCK (NEW FUNCTIONALITY)
    if (activeOrder.statusname === "DELIVERED") {
      alert("Order already delivered. Update not allowed.");
      return;
    }

    for (let item of workingItems) {
      const base = item.originalQty || 0;
      const delta = item.quantity - base;

      if (delta !== 0) {
        await axios.post("http://localhost:8082/orders/update", {
          orderid: activeOrder.orderid,
          menuid: item.menuid,
          quantity: delta,
          price: item.price
        });
      }
    }

    setActiveOrder(null);
    fetchOrders();
  };

  const totalAmount = workingItems.reduce(
    (s, i) => s + i.totaldishprice,
    0
  );

  const formatDate = (dt) =>
    new Date(dt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

  const formatTime = (dt) =>
    new Date(dt).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });

  const statusBadge = (status) => {
    switch (status) {
      case "PENDING": return "bg-warning";
      case "IN_PREPARATION": return "bg-primary";
      case "READY": return "bg-success";
      case "DELIVERED": return "bg-dark";
      default: return "bg-secondary";
    }
  };

  // ================= UI =================
  return (
    <div className="container mt-4">

      <h4 className="mb-3">🧾 My Orders</h4>

      {orders.map(order => (
        <div
          key={order.orderid}
          className="card mb-3 shadow-sm"
          onClick={() => openOrder(order)}
          style={{ cursor: "pointer" }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">

              {/* LEFT SIDE */}
              <div>
                <h6 className="fw-bold mb-1">
                  Order #{order.orderid}
                </h6>

                <div className="text-muted small">
                  Table {order.tableid}
                </div>

                <div className="text-muted small">
                  📅 {formatDate(order.orderdatetime)} &nbsp; | &nbsp;
                  ⏰ {formatTime(order.orderdatetime)}
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-end">
                <span className={`badge ${statusBadge(order.statusname)}`}>
                  {order.statusname}
                </span>

                <div className="fw-bold text-success mt-2">
                  ₹ {order.totalamount}
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* ================= FULL SCREEN ORDER ================= */}
      {activeOrder && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "#fff",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column"
        }}>

          {/* HEADER */}
          <div className="p-3 text-white"
            style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
            Order #{activeOrder.orderid} | Table {activeOrder.tableid}
          </div>

          {/* ITEMS */}
          <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
            {workingItems.map(item => (
              <div key={item.menuid} className="card mb-2">
                <div className="card-body d-flex gap-3">
                  <img
                    src={`http://localhost:8081${item.imageUrl}`}
                    alt=""
                    style={{ width: 70, height: 70, borderRadius: 8 }}
                  />

                  <div className="flex-grow-1">
                    <b>{item.menuname}</b>
                    <div>₹ {item.price}</div>

                    <div className="d-flex gap-2 mt-2">
                      <button
                        className="btn btn-sm btn-light"
                        disabled={item.quantity <= item.originalQty}
                        onClick={() => decrease(item.menuid)}
                      >−</button>

                      <span>{item.quantity}</span>

                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => increase(item)}
                      >+</button>

                      <span className="badge bg-primary">
                        Base {item.originalQty}
                      </span>
                    </div>
                  </div>

                  <b>₹ {item.totaldishprice}</b>
                </div>
              </div>
            ))}

            <hr />

            {/* ADD MORE */}
            <h6>Add More</h6>
            {menuList.map(menu => (
              <div key={menu.menuid}
                className="d-flex justify-content-between mb-2">
                <span>{menu.menuname}</span>
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => increase(menu)}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="p-3 border-top d-flex justify-content-between">
            <b>Total: ₹ {totalAmount}</b>
            <div>
              <button
                className="btn btn-secondary me-2"
                onClick={() => navigate("/user/viewmenu")}
              >
                Back to Menu
              </button>
              <button
                className="btn btn-success"
                onClick={updateOrder}
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UserOrders;
