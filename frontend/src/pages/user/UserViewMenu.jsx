import { useEffect, useState } from "react";
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

  // ---------------- API CALLS ----------------
  useEffect(() => {
    axios.get("http://localhost:8081/api/getAllCategory")
      .then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8081/api/getAllSubCategory")
      .then(res => setSubCategories(res.data));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8081/api/getAllMenu")
      .then(res => setMenuList(res.data));
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
                  src={`http://localhost:8081${menu.imageUrl}`}
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

      {/* CART POPUP */}
      {showCart && (
        <>
          <div
            onClick={() => setShowCart(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999 }}
          />

          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "420px",
              background: "#fff",
              borderRadius: "10px",
              padding: "20px",
              zIndex: 1000
            }}
          >
            <div className="d-flex justify-content-between mb-3">
              <h5>Your Cart</h5>
              <button className="btn btn-sm btn-outline-danger" onClick={() => setShowCart(false)}>✕</button>
            </div>

            {cart.length === 0 && <p className="text-muted">Cart is empty</p>}

            {cart.map(item => (
              <div key={item.menuid} className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                <img src={`http://localhost:8081${item.imageUrl}`} alt={item.menuname}
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />

                <div className="ms-3 flex-grow-1">
                  <strong>{item.menuname}</strong>
                  <div className="text-muted">₹ {item.price}</div>
                  <div className="d-flex align-items-center mt-1">
                    <button className="btn btn-sm btn-light fw-bold" onClick={() => decrease(item.menuid)}>−</button>
                    <span className="px-2 fw-bold">{item.quantity}</span>
                    <button className="btn btn-sm btn-light fw-bold" onClick={() => increase(item.menuid)}>+</button>
                  </div>
                </div>

                <div className="text-end">
                  <div className="fw-bold">₹ {item.totalPrice}</div>
                  <button className="btn btn-sm text-danger p-0 mt-1" onClick={() => removeItem(item.menuid)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}

            {cart.length > 0 && (
              <>
                <hr />
                <h6>Total: ₹ {totalAmount}</h6>
                <button className="btn btn-success w-100 mt-2">Confirm Order</button>
              </>
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default UserViewmenu;
