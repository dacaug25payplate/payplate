import { useEffect, useState } from "react";
import axios from "axios";

function Viewmenu() {
  const [menuList, setMenuList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [categoryid, setCategoryId] = useState(null);
  const [subcategoryid, setSubCategoryId] = useState("");

  const [editingMenu, setEditingMenu] = useState(null);


  useEffect(() => {
    axios.get("http://localhost:8080/Menu/getAllCategory")
      .then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/Menu/getAllSubCategory")
      .then(res => setSubCategories(res.data));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/Menu/getAllMenu")
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

  const handleDelete = async (menuid) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this menu?");

  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:8080/Menu/deletemenu/${menuid}`);

    setMenuList(prev => prev.filter(menu => menu.menuid !== menuid));

    alert("Menu deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to delete menu");
  }
};

const handleUpdate = async () => {
  const formData = new FormData();

  formData.append("menuname", editingMenu.menuname);
  formData.append("description", editingMenu.description);
  formData.append("price", editingMenu.price);
  formData.append("categoryid", editingMenu.category.categoryid);
  formData.append("subcategoryid", editingMenu.subCategory.subcategoryid);

  if (editingMenu.newImage) {
    formData.append("image", editingMenu.newImage);
  }

  try {
    await axios.put(`http://localhost:8080/Menu/updatemenu/${editingMenu.menuid}`, formData);

    alert("Menu updated");

    // Refresh list
    const res = await axios.get("http://localhost:8080/Menu/getAllMenu");
    setMenuList(res.data);

    setEditingMenu(null);
  } catch {
    alert("Update failed");
  }
};
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
                src={`http://localhost:8080${menu.imageUrl}`}
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
                
                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-sm btn-outline-primary flex-fill"
                    onClick={() => setEditingMenu(menu)}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger flex-fill"
                    onClick={() => handleDelete(menu.menuid)}
                  >
                    Delete
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

      {/* MODAL */}
{editingMenu && (
  <div className="modal show fade d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">Update Menu</h5>
          <button className="btn-close" onClick={() => setEditingMenu(null)}></button>
        </div>

        <div className="modal-body">
          <div className="row g-3">

            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Menu name"
                value={editingMenu.menuname}
                onChange={e => setEditingMenu({...editingMenu, menuname: e.target.value})}
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Price"
                value={editingMenu.price}
                onChange={e => setEditingMenu({...editingMenu, price: e.target.value})}
              />
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Description"
                value={editingMenu.description}
                onChange={e => setEditingMenu({...editingMenu, description: e.target.value})}
              />
            </div>

            <div className="col-12">
              <input
                type="file"
                className="form-control"
                onChange={e => setEditingMenu({...editingMenu, newImage: e.target.files[0]})}
              />
            </div>

          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setEditingMenu(null)}>
            Cancel
          </button>

          <button className="btn btn-success" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>

      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Viewmenu;
