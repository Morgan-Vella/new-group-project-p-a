import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");

  // Check if the current path should be accessible without a token
  const isLoginOrSignupPage = ["/login", "/signup"].includes(
    window.location.pathname
  );

  if (!token && !isLoginOrSignupPage) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
