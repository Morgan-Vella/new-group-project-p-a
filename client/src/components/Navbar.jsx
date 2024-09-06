import React from "react";
import { useNavigate, Link} from "react-router-dom";
import '../Navbar.css'

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    const token = localStorage.getItem("token");
    if (token === null) {
      console.log("Token successfully removed.");
    } else {
      console.log("Failed to remove token.");
    }
    navigate("/login");
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mynav">
        <h1 className="text-white m-2 font-monospace">Hello {localStorage.getItem("username")}</h1>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </Link>
          {children}
        </div>
      </div>
    </>
  );
};

export default Navbar;
