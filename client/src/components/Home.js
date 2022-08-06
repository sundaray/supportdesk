import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectName } from "./authSlice";

const Home = () => {
  const name = useSelector(selectName);
  return (
    <>
      {name && `Welcome ${name}`}

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
