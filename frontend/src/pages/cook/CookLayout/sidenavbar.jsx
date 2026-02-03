import { NavLink } from "react-router-dom";

function SideNav() {
  return (
    <>
    <style>
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
          Cook Panel
        </div>
      <ul className="nav flex-column p-3">
        <li className="nav-item">
          <NavLink
              to="/cook/vieworder"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 rounded px-3 ${isActive ? "bg-dark text-white" : "text-dark"
                }`
              }
            >
              View Order
            </NavLink>
        </li>
      </ul>
    </div>
    </>
  );
}

export default SideNav;
