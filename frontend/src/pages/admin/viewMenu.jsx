import { useEffect, useState } from "react";
import axios from "axios";

function Viewmenu() {
  const [menuList, setMenuList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [categoryid, setCategoryId] = useState(null);
  const [subcategoryid, setSubCategoryId] = useState("");

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

  return (
    <div>
      <h4 className="mb-3">Menu Management</h4>

      {/* Filters */}
      <div className="card p-3 mb-4">
        <div className="row g-3">

          <div className="col-md-4">
            <input
              type="text"
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

      {/* Menu Cards */}
      <div className="row">
        {filteredMenu.map(menu => (
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

                <span className={`badge ${menu.category.categoryid === 1 ? "bg-success" : "bg-danger"}`}>
                  {menu.category.categoryname}
                </span>

                <div className="mt-3">
                  <button className="btn btn-sm btn-primary w-100">
                    Update Menu
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}

        {filteredMenu.length === 0 && (
          <div className="text-center text-muted">No menu found</div>
        )}
      </div>
    </div>
  );
}

export default Viewmenu;
