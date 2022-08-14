import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { updateJwt, updateName } from "./components/clientState/authSlice";
import Home from "./components/screens/Home";
import Header from "./components/screens/Header";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Tickets from "./components/screens/Tickets";
import SingleTicket from "./components/screens/SingleTicket";
import NewTicket from "./components/screens/NewTicket";
import PrivateRoute from "./components/screens/PrivateRoute";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenObj = localStorage.getItem("authStatus")
      ? JSON.parse(localStorage.getItem("authStatus"))
      : null;

    if (tokenObj) {
      const { token } = tokenObj;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const { username } = jwt_decode(token);
      dispatch(updateName(username));
      dispatch(updateJwt(token));
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
