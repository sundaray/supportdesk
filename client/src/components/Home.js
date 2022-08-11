import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectName } from "./authSlice";

const Home = () => {
  const name = useSelector(selectName);

  return (
    <div className="border border-red-200 flex flex-col">
      <h2 className="text-center text-2xl text-blue-500">
        {name && `Welcome ${name}`}
      </h2>

      <h1 className="text-4xl text-gray-900 font-bold">
        What do you need help with?
      </h1>
      <h2 className="text-2xl text-gray-500 font-bold">
        Please choose from an option below.
      </h2>

      <div className="flex border-red-500">
        <Link
          to="new-ticket"
          className="bg-gray-500 text-gray-100 mr-2 px-2 py-1 rounded hover:bg-gray-400"
        >
          Create New Ticket
        </Link>
        <Link
          to="tickets"
          className="bg-gray-500 text-gray-100 px-2 py-1 rounded hover:bg-gray-400"
        >
          View my Tickets
        </Link>
      </div>
    </div>
  );
};

export default Home;
