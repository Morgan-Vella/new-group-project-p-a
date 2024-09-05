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
      <div className="nav">
        <h1 className="mx-4">Hello {localStorage.getItem("username")}</h1>
        <div className="link-style">
          <Link to = '/create' className="text-decoration-none" style={{color:"#F8F6F0"}}>Create Artwork</Link>
          <Link to = '/' className="text-decoration-none" style={{color:"#F8F6F0"}}> back to home</Link>
          <Link to = '/login' className="text-decoration-none" style={{color:"#F8F6F0"}} onClick={handleLogout}>
            Logout
          </Link>
          {children}
        </div>
      </div>
    </>
  );
};

export default Navbar;
