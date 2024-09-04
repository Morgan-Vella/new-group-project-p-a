import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Signupfront from "../assets/Signupfront.jpg";
const Signup = () => {
  const navigate = useNavigate();
  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmSignupPassword, setConfirmSignupPassword] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    if (signupPassword !== confirmSignupPassword) {
      setSignupErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9999/api/portfolio/user/create",
        {
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", signupName);
      localStorage.setItem("user_id", response.data.user._id);
      console.log(response.data.user._id);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.messages) {
        setSignupErrorMessage(error.response.data.messages.join(" "));
      } else {
        setSignupErrorMessage("An unexpected error occurred.");
      }
    }
  };
  return (
    <>
      <div className="main-containersignup">
        <div className="auth-container">
          <div className="login-containerimg">
            <img
              src={Signupfront}
              height={500}
              width={300}
              alt="login"
              className="login-img"
            />
          </div>
          <div className="login-container">
            <h2 className="textcolor">Sign Up</h2>

            {signupErrorMessage && (
              <p className="error-message">{signupErrorMessage}</p>
            )}

            <form onSubmit={handleSignupSubmit} className="signup-form">
              <div className="form-group ">
                <label htmlFor="signup-name subtext" className="subtext">
                  Name
                </label>
                <input
                  type="text"
                  id="signup-name"
                  className="form-input"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-email" className="subtext">
                  Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  className="form-input"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-password" className="subtext">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  className="form-input"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-signup-password" className="subtext">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-signup-password"
                  className="form-input"
                  value={confirmSignupPassword}
                  onChange={(e) => setConfirmSignupPassword(e.target.value)}
                  required
                />
              </div>
              <Link to="/login" className="account-link-text">
                Already have an account?
              </Link>
              <button type="submit" className="signup-button">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
