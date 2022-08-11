import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import TicketItem from "./TicketItem";
import Spinner from "./Spinner";

const Tickets = () => {
  const {
    data: tickets,
    isLoading,
    isError,
    error,
  } = useQuery(["tickets"], async () => {
    const { data } = await axios.get("/api/users/tickets");
    return data;
  });
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        tickets.map((ticket) => <TicketItem key={ticket._id} ticket={ticket} />)
      )}
      {tickets && tickets.length === 0 ? (
        <div className="w-100 h-32 flex flex-col justify-between items-center">
          <h1 className="text-center text-3xl sm:text-4xl text-gray-900 font-bold">
            You don't have any tickets yet.
          </h1>
          <Link to="/new-ticket">
            <button className="bg-green-500 text-gray-50 px-2 py-1 rounded hover:bg-green-600">
              Create a Ticket
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Tickets;
