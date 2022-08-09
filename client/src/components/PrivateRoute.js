import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectName } from "./authSlice";

const PrivateRoute = () => {
  const name = useSelector(selectName);

  return name ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
