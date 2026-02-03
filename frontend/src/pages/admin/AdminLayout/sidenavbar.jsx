import { NavLink } from "react-router-dom";

function SideNav() {
  return (
    <><style>
      {`
          .nav-link:hover {
            background-color: #f1f1f1;
          }
        `}
    </style>
      <div
        className="bg-light border-end d-flex flex-column"
        style={{ width: "220px", minHeight: "100vh" }}
      >
        {/* Brand / Title */}
        <div className="p-3 border-bottom fw-bold text-center">
          Admin Panel
        </div>
        <ul className="nav flex-column p-3">
          <li className="nav-item">
            <NavLink
              to="/admin/createStaff"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 rounded px-3 ${isActive ? "bg-dark text-white" : "text-dark"
                }`
              }
            >
              Create Staff
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/addmenu"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 rounded px-3 ${isActive ? "bg-dark text-white" : "text-dark"
                }`
              }
            >
              Add Menu
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/viewmenu"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 rounded px-3 ${isActive ? "bg-dark text-white" : "text-dark"
                }`
              }
            >
              View Menu
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/adddiscount"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 rounded px-3 ${isActive ? "bg-dark text-white" : "text-dark"
                }`
              }
            >
              Add Discounts
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/viewfeedbacks"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 rounded px-3 ${isActive ? "bg-dark text-white" : "text-dark"
                }`
              }
            >
              View Feedbacks
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/admin/vieworders"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 rounded px-3 ${isActive ? "bg-dark text-white" : "text-dark"
                }`
              }
            >
              View orders
            </NavLink>
          </li>
        </ul>
      </div></>
  );
}

export default SideNav;
