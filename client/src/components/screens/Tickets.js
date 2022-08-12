import React from "react";
import { Link } from "react-router-dom";
import { useGetTickets } from "../hooks/useQuery";
import TicketItem from "./TicketItem";
import Spinner from "../sharedUi/Spinner";
import Error from "../sharedUi/Error";

const Tickets = () => {
  const { data: tickets, isLoading, isError, error } = useGetTickets();
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Error error={error} />
      ) : (
        tickets.map((ticket) => <TicketItem key={ticket._id} ticket={ticket} />)
      )}
      {!isError && tickets && tickets.length === 0 ? (
        <div className="w-100 h-32 flex flex-col justify-between items-center">
          <h1 className="text-center text-3xl sm:text-4xl text-gray-900 font-bold">
            You don't have any tickets yet.
          </h1>
          <Link to="/new-ticket">
            <button className="bg-indigo-500 text-gray-50 px-2 py-1 rounded hover:bg-indigo-600">
              Create a Ticket
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Tickets;
