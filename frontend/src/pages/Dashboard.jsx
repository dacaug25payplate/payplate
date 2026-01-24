import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector(state => state.user.user);

  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold">Welcome to dashboard {user?.role?.rolename}</h1>
    </div>
  );
}

export default Dashboard;
