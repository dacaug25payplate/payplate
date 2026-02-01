import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="bg-white border-end" style={{ width: "220px" }}>
      <ul className="nav flex-column p-3">
        <li className="nav-item">
          <Link className="nav-link" to="/cook/vieworder">
            View Order
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
