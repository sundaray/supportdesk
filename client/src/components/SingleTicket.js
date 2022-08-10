import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "@tanstack/react-query";
import axios from "axios";

const SingleTicket = () => {
  const { id: postId } = useParams();

  const navigate = useNavigate();

  const {
    data: ticket,
    isLoading,
    isError,
    error,
  } = useQuery(["tickets", postId], async () => {
    const { data } = await axios.get(`/api/users/tickets/${postId}`);
    return data;
  });

  const mutation = useMutation(
    () => {
      axios.delete(`/api/users/tickets/${postId}`);
    },
    {
      onSuccess: () => {
        navigate("/tickets");
        queryCache.invalidateQueries("tickets");
      },
    }
  );

  const handleDeleteTicket = () => {
    mutation.mutate();
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <>
          <p>{new Date(ticket.createdAt).toLocaleString()}</p>
          <p>{ticket.product}</p>
          <p>{ticket.description}</p>
          <button onClick={handleDeleteTicket}>Delete</button>
        </>
      )}
    </div>
  );
};

export default SingleTicket;
