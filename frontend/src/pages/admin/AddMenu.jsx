import { useEffect, useState } from "react";
import axios from "axios";

function AddMenu() {

  const [form, setForm] = useState({
    menuname: "",
    price: "",
    description: "",
    categoryid: "",
    subcategoryid: "",
    image: null
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/getAllCategory")
      .then(res => setCategories(res.data));

    axios.get("http://localhost:8081/api/getAllSubCategory")
      .then(res => setSubcategories(res.data));
  }, []);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "menuname":
        if (!value.trim()) error = "Menu name is required";
        break;
      case "price":
        if (!value) error = "Price is required";
        else if (!/^\d+(\.\d{1,2})?$/.test(value))
          error = "Only numbers allowed";
        break;
      case "description":
        if (!value.trim()) error = "Description is required";
        break;
      case "categoryid":
        if (!value) error = "Select category";
        break;
      case "subcategoryid":
        if (!value) error = "Select subcategory";
        break;
      case "image":
        if (!value) error = "Image is required";
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" && value && !/^\d*\.?\d*$/.test(value)) return;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    Object.keys(form).forEach(key => {
      if (!validateField(key, form[key])) valid = false;
    });

    if (!valid) return;

    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));

    try {
      await axios.post("http://localhost:8081/api/menu", formData);
      alert("Menu added successfully");
    } catch {
      alert("Failed to add menu");
    }
  };

  return (
    <div className="p-4">

      <h4 className="mb-3">Add New Menu</h4>

      <div className="card p-4 shadow-sm">

        <form onSubmit={handleSubmit} className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Menu Name</label>
            <input
              className="form-control"
              name="menuname"
              value={form.menuname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.menuname && <small className="text-danger">{errors.menuname}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Price</label>
            <input
              className="form-control"
              name="price"
              value={form.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.price && <small className="text-danger">{errors.price}</small>}
          </div>

          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={form.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
            />
            {errors.description && <small className="text-danger">{errors.description}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="categoryid"
              value={form.categoryid}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.categoryid} value={cat.categoryid}>
                  {cat.categoryname}
                </option>
              ))}
            </select>
            {errors.categoryid && <small className="text-danger">{errors.categoryid}</small>}
          </div>

          <div className="col-md-6">
            <label className="form-label">Sub Category</label>
            <select
              className="form-select"
              name="subcategoryid"
              value={form.subcategoryid}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select SubCategory</option>
              {subcategories.map(sub => (
                <option key={sub.subcategoryid} value={sub.subcategoryid}>
                  {sub.subcategoryname}
                </option>
              ))}
            </select>
            {errors.subcategoryid && <small className="text-danger">{errors.subcategoryid}</small>}
          </div>

          <div className="col-12">
            <label className="form-label">Menu Image</label>
            <input
              type="file"
              className="form-control"
              onChange={e => {
                setForm(prev => ({ ...prev, image: e.target.files[0] }));
                validateField("image", e.target.files[0]);
              }}
            />
            {errors.image && <small className="text-danger">{errors.image}</small>}
          </div>

          <div className="col-12 text-center mt-3">
            <button className="btn btn-success px-5">
              Save Menu
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddMenu;
