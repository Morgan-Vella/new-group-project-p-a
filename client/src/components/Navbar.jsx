import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mynav">
        <h1 className="text-white m-2 font-monospace">Hello {localStorage.getItem("username")}</h1>
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Navbar;
