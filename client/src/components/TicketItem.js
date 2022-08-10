import React from "react";
import { Link } from "react-router-dom";

const TicketItem = ({ ticket }) => {
  const { _id, product } = ticket;
  return (
    <>
      <Link to={`/tickets/${_id}`}>
        <p>{product}</p>
      </Link>
    </>
  );
};

export default TicketItem;
