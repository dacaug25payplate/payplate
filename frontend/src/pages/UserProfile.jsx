import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUserProfile();
    }, []);

    const getUserProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/user/currentuserprofile/{userid}`, {
                withCredentials: true, // send cookies if using sessions
            });
            setUser(res.data);
        } catch (err) {
            console.error(err);
            // toastr.error("Something went wrong");
            // redirect to login if no user
            // navigate("/login");
        }
    };

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", margin: "auto", borderRadius: "14px" }}>
                <div className="text-center mb-3">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="profile"
                        width="80"
                        height="80"
                        className="rounded-circle"
                    />
                    <h5 className="mt-2 fw-bold">{user.username}</h5>
                    <small className="text-muted">{user.role.rolename}</small>
                </div>

                <div className="mb-2">
                    <strong>Email / Mobile:</strong> {user.mobileno}
                </div>
                <div className="mb-2">
                    <strong>Address:</strong> {user.address}
                </div>
                <div className="mb-2">
                    <strong>Security Question:</strong> {user.question.question}
                </div>
                <div className="text-center mt-3">
                    <button
                        className="btn btn-outline-dark w-100"
                        onClick={() => navigate("/change-password")}
                    >
                        🔒 Change Password
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;