import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGetTickets } from "./hooks/useQuery";
import TicketItem from "./TicketItem";
import Spinner from "./Spinner";

const errorVariant = {
  initial: {
    opacity: 0,
    y: "-0.2rem",
  },
  animate: {
    opacity: 1,
    y: "0rem",
  },
  exit: {
    opacity: 0,
    y: "-0.2rem",
  },
};

const Tickets = () => {
  const { data: tickets, isLoading, isError, error } = useGetTickets();
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <AnimatePresence>
          <motion.div
            variants={errorVariant}
            initial="initial"
            animate="animate"
            exit="initial"
            className="w-11/12  md:w-3/5 xl:w-2/5 h-10 bg-red-400 shadow-md rounded px-4 py-2 m-auto"
          >
            <p className="text-center">{error.message}</p>
          </motion.div>
        </AnimatePresence>
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
