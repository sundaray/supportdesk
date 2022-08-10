import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TicketItem from "./TicketItem";

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
        <p>Loading...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        tickets.map((ticket) => <TicketItem key={ticket._id} ticket={ticket} />)
      )}
    </div>
  );
};

export default Tickets;
