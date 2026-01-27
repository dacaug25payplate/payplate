import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StaffList() {
  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();

  const loadStaff = () => {
    axios
      .get("http://localhost:8080/api/user/getstaff")
      .then(res => setStaff(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const deleteStaff = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/user/deleteStaff/${id}`);
      loadStaff(); // refresh table after delete
    } catch (err) {
      alert("Failed to delete staff");
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Staff Members</h4>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/addStaff")}
        >
          + Add Staff
        </button>
      </div>

      <div className="card p-3">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {staff.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No staff found</td>
              </tr>
            ) : (
              staff.map(user => (
                <tr key={user.userid}>
                  <td>{user.username}</td>
                  <td>{user.role.rolename}</td>
                  <td>{user.mobileno}</td>
                  <td>{user.address}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteStaff(user.userid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffList;
