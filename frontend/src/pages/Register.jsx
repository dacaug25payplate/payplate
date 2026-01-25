import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AddMenu() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    menuname: "",
    description: "",
    price: "",
    categoryid: "",
    subcategoryid: "",
    image: null
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [errors, setErrors] = useState({});

  // 🔹 Validation
  const validateField = (name, value) => {
    switch (name) {
      case "menuname":
        if (!value.trim()) return "Menu name is required";
        if (value.length < 3) return "Menu name must be at least 3 characters";
        break;

      case "price":
        if (!value) return "Price is required";
        if (value <= 0) return "Price must be greater than 0";
        break;

      case "categoryid":
        if (!value) return "Category is required";
        break;

      case "subcategoryid":
        if (!value) return "SubCategory is required";
        break;

      case "image":
        if (!value) return "Image is required";
        break;

      default:
        return "";
    }
    return "";
  };

  // 🔹 Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setErrors({ ...errors, image: validateField("image", files[0]) });
    } else {
      setForm({ ...form, [name]: value });
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  // 🔹 Load categories & subcategories
  useEffect(() => {
    axios.get("http://localhost:8080/api/getAllCategory")
      .then(res => setCategories(res.data));
      console.log(response.data);

    axios.get("http://localhost:8080/api/getAllSubCategory")
      .then(res => setSubcategories(res.data));
      console.log(response.data);
  }, []);

  const filteredSubCategories = subcategories.filter(
    sub => sub.category?.categoryid == form.categoryid
  );

  // 🔹 Submit
  const submit = async (e) => {
    e.preventDefault();

    const newErrors = {
      menuname: validateField("menuname", form.menuname),
      price: validateField("price", form.price),
      categoryid: validateField("categoryid", form.categoryid),
      subcategoryid: validateField("subcategoryid", form.subcategoryid),
      image: validateField("image", form.image)
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(err => err)) return;

    const formData = new FormData();
    formData.append("menuname", form.menuname);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("categoryid", form.categoryid);
    formData.append("subcategoryid", form.subcategoryid);
    formData.append("image", form.image);

    try {
      await axios.post("http://localhost:8080/api/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Menu added successfully");
      navigate("/dashboard"); // change if needed
    } catch {
      alert("Failed to add menu");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card shadow p-4">

            <h3 className="text-center mb-3">Add Menu</h3>

            <form onSubmit={submit} className="row g-3">

              {/* Menu Name */}
              <div className="col-md-6">
                <input
                  className="form-control"
                  name="menuname"
                  placeholder="Menu Name"
                  value={form.menuname}
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.menuname}</small>
              </div>

              {/* Price */}
              <div className="col-md-6">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.price}</small>
              </div>

              {/* Description */}
              <div className="col-md-12">
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {/* Category */}
              <div className="col-md-6">
                <select
                  className="form-select"
                  name="categoryid"
                  value={form.categoryid}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.categoryid} value={cat.categoryid}>
                      {cat.categoryname}
                    </option>
                  ))}
                </select>
                <small className="text-danger">{errors.categoryid}</small>
              </div>

              {/* SubCategory */}
              <div className="col-md-6">
                <select
                  className="form-select"
                  name="subcategoryid"
                  value={form.subcategoryid}
                  onChange={handleChange}
                >
                  <option value="">Select SubCategory</option>
                  {filteredSubCategories.map(sub => (
                    <option key={sub.subcategoryid} value={sub.subcategoryid}>
                      {sub.subcategoryname}
                    </option>
                  ))}
                </select>
                <small className="text-danger">{errors.subcategoryid}</small>
              </div>

              {/* Image */}
              <div className="col-md-12">
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
                <small className="text-danger">{errors.image}</small>
              </div>

              <div className="col-12">
                <button className="btn btn-success w-100">
                  Save Menu
                </button>
              </div>

            </form>

            <div className="text-center mt-3">
              <Link to="/dashboard">Back</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMenu;
