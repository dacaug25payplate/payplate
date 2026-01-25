import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="bg-white border-end" style={{ width: "220px" }}>
      <ul className="nav flex-column p-3">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/createStaff">
            Create Staff
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/addmenu">
            Add Menu
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/viewmenu">
            View Menu
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/adddiscount">
            Add Discounts
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/viewfeedbacks">
            View Feedbacks
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
