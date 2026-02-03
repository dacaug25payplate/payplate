import axios from "axios";
import { useNavigate } from "react-router-dom";
import toastr from "../../services/toastrService";

function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/user/logout",
        {},
        { withCredentials: true } // IMPORTANT for session
      );

      toastr.success(res.data.message);

      // Clear frontend data
      localStorage.clear();
      sessionStorage.clear();

      navigate("/login");
    } catch (err) {
      console.error(err);
      toastr.error("Logout failed");
    }
  };

  return logout;
}

export default useLogout;