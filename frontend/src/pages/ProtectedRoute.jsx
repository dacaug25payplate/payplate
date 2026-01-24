import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.roleId.roleName !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
