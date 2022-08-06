import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectName, logout } from "./authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const name = useSelector(selectName);
  console.log(name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authStatus");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {name && `Welcome ${name}`}
      {name && <button onClick={handleLogout}>Logout</button>}

      <section>
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below.</p>
      </section>

      <Link to="new-ticket">Create New Ticket</Link>
      <Link to="tickets">View my Tickets</Link>
    </>
  );
};

export default Home;
