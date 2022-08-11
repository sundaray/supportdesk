import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { updateName } from "./components/authSlice";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Tickets from "./components/Tickets";
import SingleTicket from "./components/SingleTicket";
import NewTicket from "./components/NewTicket";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenObj = localStorage.getItem("authStatus")
      ? JSON.parse(localStorage.getItem("authStatus"))
      : null;

    if (tokenObj) {
      console.log(tokenObj);
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
