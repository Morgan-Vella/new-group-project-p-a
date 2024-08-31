import React from "react";

const Signup = () => {
  return (
    <>
      <div className="auth-container">
        <div className="signup-container">
          <h2>Sign Up</h2>
          {signupErrorMessage && (
            <p className="error-message">{signupErrorMessage}</p>
          )}
          <form onSubmit={handleSignupSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="signup-name">Name</label>
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
              <label htmlFor="signup-email">Email</label>
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
              <label htmlFor="signup-password">Password</label>
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
              <label htmlFor="confirm-signup-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-signup-password"
                className="form-input"
                value={confirmSignupPassword}
                onChange={(e) => setConfirmSignupPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
