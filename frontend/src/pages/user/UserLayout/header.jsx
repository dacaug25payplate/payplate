import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 d-flex align-items-center">

      {/* LEFT SIDE (Brand) */}
      <span className="navbar-brand fw-bold"> 🍽️ PayPlate
        {user && (
          <span className="ms-2 text-warning"> | Hi,
            {user.name} </span>)}
      </span>
      {/* RIGHT SIDE (Buttons) */}
      <div className="ms-auto d-flex gap-2">

        <button onClick={() => navigate("/user/viewmenu")}
          className="btn btn-sm btn-outline-light" > View Menu
        </button>

        <button
          onClick={() => navigate("/user/vieworder")}
          className="btn btn-sm btn-outline-light" > View Orders
        </button>

        <button
          onClick={logout} 
          className="btn btn-sm btn-outline-light" > Logout
        </button>

      </div>
    </nav>);

}
export default Header;