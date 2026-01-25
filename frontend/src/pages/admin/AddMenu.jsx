import { useEffect, useState } from "react";
import axios from "axios";

function AddMenu() {

  const [menuname, setMenuname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [categoryid, setCategoryid] = useState("");
  const [subcategoryid, setSubcategoryid] = useState("");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [image, setImage] = useState(null);

  // Load categories
  useEffect(() => {
    axios.get("http://localhost:8080/api/getAllCategory")
      .then((res) => {
        console.log("Categories:", res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Load subcategories (NO FILTERING YET)
  useEffect(() => {
    axios.get("http://localhost:8080/api/getAllSubCategory")
      .then((res) => {
        console.log("SubCategories:", res.data);
        setSubcategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("menuname", menuname);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryid", categoryid);
    formData.append("subcategoryid", subcategoryid);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/api/menu", formData);
      console.log(formData);
      alert("Menu added successfully");
    } catch (err) {
      alert("Failed to add menu");
    }
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h3>Add Menu</h3>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Menu Name"
          value={menuname}
          onChange={(e) => setMenuname(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        {/* CATEGORY */}
        <select
          value={categoryid}
          onChange={(e) => setCategoryid(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.categoryid} value={cat.categoryid}>
              {cat.categoryname}
            </option>
          ))}
        </select>

        <br /><br />

        {/* SUBCATEGORY (NO FILTER) */}
        <select
          value={subcategoryid}
          onChange={(e) => setSubcategoryid(e.target.value)}
        >
          <option value="">Select SubCategory</option>
          {subcategories.map((sub) => (
            <option key={sub.subcategoryid} value={sub.subcategoryid}>
              {sub.subcategoryname}
            </option>
          ))}
        </select>

        <br /><br />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <br /><br />

        <button type="submit">Save Menu</button>
      </form>
    </div>
  );
}

export default AddMenu;
