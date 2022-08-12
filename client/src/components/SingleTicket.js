import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useGetSingleTicket, useDeleteSingleTicket } from "./hooks/useQuery";
import Spinner from "./Spinner";
import Error from "./Error";
import Modal from "./Modal";

const SingleTicket = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { id: postId } = useParams();

  const {
    data: ticket,
    isLoading,
    isError,
    error,
  } = useGetSingleTicket(postId);

  const mutation = useDeleteSingleTicket(postId);

  const handleDeleteTicket = () => {
    mutation.mutate();
  };

  return (
    <div>
      {modalOpen ? (
        <Modal
          handleDeleteTicket={handleDeleteTicket}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      ) : isLoading ? (
        <Spinner />
      ) : isError ? (
        <Error error={error} />
      ) : (
        <div className="w-11/12  md:w-3/5 xl:w-2/5 m-auto">
          <Link to="/tickets">
            <button className="bg-transparent hover:bg-gray-400 text-gray-700 font-semibold hover:text-white mb-6 py-1 px-2 border border-gray-400 hover:border-transparent rounded">
              <ChevronLeftIcon className="w-5 h-5 inline" />
              All Tickets
            </button>
          </Link>
          <p className="text-gray-900 mb-2">
            <span className="font-bold">Date:</span>{" "}
            {new Date(ticket.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-900 mb-2">
            <span className="font-bold">Product:</span> {ticket.product}
          </p>
          <p className="text-gray-900 mb-6 pb-4 border-b">
            <span className="font-bold">Issue:</span> {ticket.description}
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Delete Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleTicket;
