import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NewTicket from "./components/NewTicket";
import Tickets from "./components/Tickets";
import SingleTicket from "./components/SingleTicket";
import PrivateRoute from "./components/PrivateRoute";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateName } from "./components/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenObj = localStorage.getItem("authStatus")
      ? JSON.parse(localStorage.getItem("authStatus"))
      : null;

    if (tokenObj) {
      const { token } = tokenObj;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { name } = jwt_decode(token);
      dispatch(updateName(name));
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tickets/:id" element={<SingleTicket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-ticket" element={<PrivateRoute />}>
          <Route path="/new-ticket" element={<NewTicket />} />
        </Route>
        <Route path="/tickets" element={<PrivateRoute />}>
          <Route path="/tickets" element={<Tickets />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
