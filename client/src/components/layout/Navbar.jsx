import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/layout.css";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div
        className="navbar-brand"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        <h1>Tool Lending Library</h1>
        <p>Inventory Management System</p>
      </div>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/tools")}
        >
          Tool Inventory
        </button>

        {user?.role === "admin" && (
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/register-staff")}
          >
            Register Staff
          </button>
        )}
      </nav>

      <div className="navbar-user">
        <div className="user-info">
          <h4>{user?.fullName}</h4>
          <p>{user?.role === "admin" ? "Administrator" : "Staff"}</p>
        </div>

        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
