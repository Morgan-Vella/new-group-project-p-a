import React from "react";
import { useNavigate, Link} from "react-router-dom";



const ForumNav = () => {
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
        <div className="navbar-containerimg">
            <nav className="nav-flex">
                <h1 className="m-3" style={{color:"#dea45a"}}>Artistree</h1>
                <div className="btn-style">
                    <Link to = '/' className="text-decoration-none" style={{color:"#F8F6F0"}}> back to home</Link>
                    <button className = "text-decoration-none"onClick={handleLogout}>
                    Logout
                    </button>
                </div>
            </nav>
        </div>
      

    </>
  );
};

export default ForumNav;
