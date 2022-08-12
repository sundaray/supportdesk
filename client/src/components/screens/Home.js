import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectName } from "../clientState/authSlice";

const Home = () => {
  const name = useSelector(selectName);

  return (
    <div className="w-100 h-60 flex flex-col justify-center">
      <h2 className="text-center text-xl sm:text-2xl text-indigo-500">
        {name && `Welcome ${name}`}
      </h2>

      <h1 className="text-center text-3xl sm:text-4xl text-gray-900 font-bold">
        What do you need help with?
      </h1>
      <h2 className="text-center text-lg sm:text-xl text-gray-500 font-bold">
        Please choose from an option below.
      </h2>

      <div className="m-auto flex">
        <Link
          to="new-ticket"
          className="bg-green-500 text-gray-50 mr-2 px-2 py-1 rounded hover:bg-green-600"
        >
          Create New Ticket
        </Link>
        <Link
          to="tickets"
          className="bg-green-500 text-gray-50 px-2 py-1 rounded hover:bg-green-600"
        >
          View my Tickets
        </Link>
      </div>
    </div>
  );
};

export default Home;
