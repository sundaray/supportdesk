import React from "react";
import { Link } from "react-router-dom";

const TicketItem = ({ ticket }) => {
  const { _id, product, createdAt } = ticket;

  const ticketDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="flex justify-between w-11/12  md:w-3/5 xl:w-2/5 m-auto mb-4 pb-4 border-b">
      <p>{ticketDate}</p>
      <Link to={`/tickets/${_id}`}>
        <p className="bg-purple-400 rounded px-2 py-1 hover:bg-purple-500">
          {product}
        </p>
      </Link>
    </div>
  );
};

export default TicketItem;
