import React from "react";
import { Navigate } from "react-router-dom";

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  const user = parseJwt(token);
  if (!user) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    console.log("Access denied. User role:", user.role, "Required role:", role);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
