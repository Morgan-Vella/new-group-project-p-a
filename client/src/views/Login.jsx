import { React, useState } from "react";
import axios from "axios";
import loginfront from "../assets/Loginfront.jpg";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9999/api/portfolio/user/login",
        {
          email: loginEmail,
          password: loginPassword,
        }
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.name);
      localStorage.setItem("user_id", response.data.user._id);
      console.log(response.data.user._id);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.messages) {
        setLoginErrorMessage(error.response.data.messages.join(" "));
      } else {
        setLoginErrorMessage("An unexpected error occurred.");
      }
    }
  };
  return (
    <>
      <div className="main-containerlogin">
        <div className="auth-container">
          <div className="login-containerimg">
            <img
              src={loginfront}
              height={500}
              width={300}
              alt="login"
              className="login-img"
            />
          </div>
          <div className="login-container">
            <h2 style={{ color: "white" }}>Login</h2>
            {loginErrorMessage && (
              <p className="error-message">{loginErrorMessage}</p>
            )}
            <form onSubmit={handleLoginSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="login-email" style={{ color: "white" }}>
                  Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  className="form-input"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password" style={{ color: "white" }}>
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  className="form-input"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Link to="/signup" style={{ color: "#feeced" }}>
                Don't have an account?
              </Link>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
