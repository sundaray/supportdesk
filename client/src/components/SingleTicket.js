import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SingleTicket = () => {
  const { id: postId } = useParams();

  const {
    data: ticket,
    isLoading,
    isError,
    error,
  } = useQuery(["tickets", postId], async () => {
    const { data } = await axios.get(`/api/users/tickets/${postId}`);
    return data;
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <>
          <p>{ticket.product}</p>
          <p>{ticket.description}</p>
        </>
      )}
    </div>
  );
};

export default SingleTicket;
