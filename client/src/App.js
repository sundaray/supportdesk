import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateName } from "./components/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("authStatus"));
    const { name } = jwt_decode(token);
    dispatch(updateName(name));
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
