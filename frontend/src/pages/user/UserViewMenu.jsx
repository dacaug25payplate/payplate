import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

function UserViewmenu() {

  // ---------------- STATE ----------------
  const [menuList, setMenuList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [categoryid, setCategoryId] = useState(null);
  const [subcategoryid, setSubCategoryId] = useState("");

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // ---------------- TABLE + ORDER STATE ----------------
  const [tables, setTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState("");

  const loggedInUser = useSelector(state => state.user.user);
  const userId = loggedInUser?.userid;

  // ---------------- API CALLS ----------------
  // ----------------- api call for get all category -------------
  useEffect(() => {
    axios.get("http://localhost:8080/Menu/getAllCategory")
      .then(res => setCategories(res.data));
  }, []);

  // ----------------- api call for get all subcategory -------------
  useEffect(() => {
    axios.get("http://localhost:8080/Menu/getAllSubCategory")
      .then(res => setSubCategories(res.data));
  }, []);

  // ----------- api call for getall menu-----------
  useEffect(() => {
    axios.get("http://localhost:8080/Menu/getAllMenu")
      .then(res => setMenuList(res.data));
  }, []);

  // ---------- api call for getall table -----------
  useEffect(() => {
    axios.get("http://localhost:8080/orders/servingTables")
      .then(res => setTables(res.data))
      .catch(err => console.error(err));
  }, []);

  // ---------------- SEARCH + FILTER ----------------
  const filteredMenu = menuList.filter(menu => {
    return (
      (
        menu.menuname?.toLowerCase().includes(searchText.toLowerCase()) ||
        menu.category?.categoryname?.toLowerCase().includes(searchText.toLowerCase()) ||
        menu.subCategory?.subcategoryname?.toLowerCase().includes(searchText.toLowerCase())
      ) &&
      (categoryid === null || menu.category?.categoryid === categoryid) &&
      (subcategoryid === "" || menu.subCategory?.subcategoryid === Number(subcategoryid))
    );
  });

  // ---------------- CART LOGIC ----------------
  const addItem = (menu) => {
    setCart(prev => {
      const item = prev.find(i => i.menuid === menu.menuid);
      if (item) {
        return prev.map(i =>
          i.menuid === menu.menuid
            ? { ...i, quantity: i.quantity + 1, totalPrice: (i.quantity + 1) * i.price }
            : i
        );
      }
      return [...prev, {
        menuid: menu.menuid,
        menuname: menu.menuname,
        price: menu.price,
        imageUrl: menu.imageUrl,
        quantity: 1,
        totalPrice: menu.price
      }];
    });
  };

  const increase = (id) => {
    setCart(prev =>
      prev.map(i =>
        i.menuid === id
          ? { ...i, quantity: i.quantity + 1, totalPrice: (i.quantity + 1) * i.price }
          : i
      )
    );
  };

  const decrease = (id) => {
    setCart(prev =>
      prev
        .map(i =>
          i.menuid === id
            ? { ...i, quantity: i.quantity - 1, totalPrice: (i.quantity - 1) * i.price }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(i => i.menuid !== id));
  };

  const getQty = (id) =>
    cart.find(i => i.menuid === id)?.quantity || 0;

  const totalAmount = cart.reduce((sum, i) => sum + i.totalPrice, 0);


  // ----- method to confirm order --------------
  const confirmOrder = async () => {

    if (!userId) {
      alert("Please login again");
      return;
    }


    if (!selectedTableId) {
      alert("Please select a table");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      userid: userId,
      tableid: selectedTableId,
      orderItems: cart.map(item => ({
        menuid: item.menuid,
        quantity: item.quantity,
        totaldishprice: item.totalPrice
      }))
    };

    console.log("Sending order:", orderData);

    try {
      await axios.post(
        "http://localhost:8080/orders/confirm",
        orderData
      );

      alert("Order placed successfully");
      //location.reload();

      setCart([]);
      setSelectedTableId("");
      setShowCart(false);

    } catch (err) {
      console.error(err);
      alert("Order failed");
    }
  };



  // ---------------- UI ----------------
  return (
    <div className="container mt-3">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Menu</h4>

        {/* CART ICON */}
        <div
          onClick={() => setShowCart(true)}
          style={{ cursor: "pointer", position: "relative", fontSize: "26px", color: "#0d6efd" }}
        >
          <i className="bi bi-cart3"></i>
          {cart.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-10px",
                background: "#dc3545",
                color: "#fff",
                borderRadius: "50%",
                padding: "2px 7px",
                fontSize: "12px",
                fontWeight: "bold"
              }}
            >
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {/* FILTERS */}
      <div className="card p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Search menu / category / subcategory"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={categoryid ?? ""}
              onChange={(e) =>
                setCategoryId(e.target.value === "" ? null : Number(e.target.value))
              }
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.categoryid} value={cat.categoryid}>
                  {cat.categoryname}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={subcategoryid}
              onChange={(e) => setSubCategoryId(e.target.value)}
            >
              <option value="">All Subcategories</option>
              {subCategories.map(sc => (
                <option key={sc.subcategoryid} value={sc.subcategoryid}>
                  {sc.subcategoryname}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* MENU CARDS */}
      <div className="row">
        {filteredMenu.map(menu => {
          const qty = getQty(menu.menuid);

          return (
            <div className="col-md-3 mb-4" key={menu.menuid}>
              <div className="card h-100 shadow-sm">

                <img
                  src={`http://localhost:8080${menu.imageUrl}`}
                  className="card-img-top"
                  style={{ height: "160px", objectFit: "cover" }}
                  alt={menu.menuname}
                />

                <div className="card-body">
                  <h5 className="card-title">{menu.menuname}</h5>
                  <p className="small text-muted">{menu.description}</p>
                  <p className="fw-bold">₹ {menu.price}</p>

                  <span className={`badge ${menu.category?.categoryid === 1 ? "bg-success" : "bg-danger"}`}>
                    {menu.category?.categoryname}
                  </span>

                  <div className="mt-3">
                    {qty === 0 ? (
                      <button
                        className="btn btn-sm btn-outline-success w-100 fw-bold"
                        onClick={() => addItem(menu)}
                      >
                        + ADD
                      </button>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center border rounded px-2" style={{ height: "34px" }}>
                        <button className="btn btn-sm btn-light fw-bold" onClick={() => decrease(menu.menuid)}>−</button>
                        <span className="fw-bold text-success">{qty}</span>
                        <button className="btn btn-sm btn-light fw-bold" onClick={() => increase(menu.menuid)}>+</button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* FULL PAGE CART */}
      {showCart && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#fff",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* FIXED HEADER */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              padding: "12px 16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="bi bi-cart-check-fill" style={{ fontSize: "20px" }}></i>
              <div>
                <h6 className="mb-0">Your Cart</h6>
                <small style={{ opacity: 0.9, fontSize: "12px" }}>{cart.length} items</small>
              </div>
            </div>
            <button
              className="btn btn-light btn-sm"
              onClick={() => setShowCart(false)}
              style={{ borderRadius: "20px", fontWeight: "bold", padding: "4px 12px" }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              paddingBottom: "12px"
            }}
          >
            {cart.length === 0 ? (
              <div className="text-center mt-5">
                <i className="bi bi-cart-x" style={{ fontSize: "60px", color: "#ccc" }}></i>
                <p className="text-muted mt-3">Your cart is empty</p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => setShowCart(false)}
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div
                    key={item.menuid}
                    className="card mb-2 shadow-sm"
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid #e0e0e0"
                    }}
                  >
                    <div className="card-body p-2">
                      <div className="d-flex gap-2">
                        {/* DISH IMAGE */}
                        <img
                          src={`http://localhost:8080${item.imageUrl}`}
                          alt={item.menuname}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                          }}
                        />

                        {/* DISH DETAILS */}
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-0 fw-bold" style={{ fontSize: "14px" }}>{item.menuname}</h6>
                              <p className="text-muted mb-1" style={{ fontSize: "12px" }}>
                                ₹ {item.price} per item
                              </p>
                            </div>
                            <button
                              className="btn btn-sm btn-outline-danger p-1"
                              onClick={() => removeItem(item.menuid)}
                              style={{
                                borderRadius: "50%",
                                width: "24px",
                                height: "24px",
                                padding: 0,
                                fontSize: "10px",
                                lineHeight: 1
                              }}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>

                          {/* QUANTITY CONTROLS */}
                          <div className="d-flex justify-content-between align-items-center mt-1">
                            <div
                              className="d-flex align-items-center border rounded"
                              style={{
                                background: "#f8f9fa",
                                padding: "2px 6px",
                                gap: "8px"
                              }}
                            >
                              <button
                                className="btn btn-sm btn-light fw-bold"
                                onClick={() => decrease(item.menuid)}
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  padding: 0,
                                  borderRadius: "50%",
                                  fontSize: "14px",
                                  lineHeight: 1
                                }}
                              >
                                −
                              </button>
                              <span className="fw-bold" style={{ fontSize: "14px", minWidth: "20px", textAlign: "center" }}>
                                {item.quantity}
                              </span>
                              <button
                                className="btn btn-sm btn-success fw-bold"
                                onClick={() => increase(item.menuid)}
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  padding: 0,
                                  borderRadius: "50%",
                                  fontSize: "14px",
                                  lineHeight: 1
                                }}
                              >
                                +
                              </button>
                            </div>

                            {/* TOTAL PRICE */}
                            <div className="text-end">
                              <h6 className="mb-0 fw-bold text-success" style={{ fontSize: "14px" }}>
                                ₹ {item.totalPrice.toFixed(2)}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* FIXED FOOTER - SIMPLE & COMPACT */}
          {cart.length > 0 && (
            <div
              style={{
                background: "#fff",
                borderTop: "2px solid #e0e0e0",
                padding: "12px 16px",
                boxShadow: "0 -2px 8px rgba(0,0,0,0.1)"
              }}
            >
              {/* TOTAL AMOUNT */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Total Amount:</h6>
                <h5 className="mb-0 text-success fw-bold">₹ {totalAmount.toFixed(2)}</h5>
              </div>

              {/* TABLE SELECTION */}
              <div className="mb-2">
                <label className="fw-bold mb-1" style={{ fontSize: "13px" }}>
                  <i className="bi bi-table me-1"></i>Select Table
                </label>
                <select
                  className="form-select"
                  value={selectedTableId}
                  onChange={(e) => setSelectedTableId(Number(e.target.value))}
                >
                  <option value="">-- Select Available Table --</option>

                  {tables.filter(t => t.status?.toUpperCase() === "AVAILABLE").length === 0 ? (
                    <option disabled>No tables available</option>
                  ) : (
                    tables
                      .filter(t => t.status?.toUpperCase() === "AVAILABLE")
                      .map(t => (
                        <option key={t.tableid} value={t.tableid}>
                          Table {t.tableid}
                        </option>
                      ))
                  )}
                </select>
              </div>

              {/* CONFIRM ORDER BUTTON */}
              <button
                className="btn btn-success w-100"
                onClick={confirmOrder}
                disabled={!selectedTableId}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  background: selectedTableId
                    ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
                    : "#ccc",
                  border: "none",
                  boxShadow: selectedTableId ? "0 3px 12px rgba(17, 153, 142, 0.4)" : "none"
                }}
              >
                {selectedTableId ? (
                  <>
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Confirm Order
                  </>
                ) : (
                  <>
                    <i className="bi bi-exclamation-circle me-2"></i>
                    Please Select a Table
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default UserViewmenu;