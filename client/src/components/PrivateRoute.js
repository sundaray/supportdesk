import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectName } from "./authSlice";

const PrivateRoute = () => {
  const location = useLocation();
  const name = useSelector(selectName);

  return name ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
