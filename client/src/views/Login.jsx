import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); //  state for login error

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

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.name);
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
      <div className="auth-container">
        <div className="login-container">
          <h2>Login</h2>
          {loginErrorMessage && (
            <p className="error-message">{loginErrorMessage}</p>
          )}
          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
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
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                className="form-input"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
