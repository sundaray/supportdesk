import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "./Backdrop";

const modalVariant = {
  initial: {
    y: "-0.5rem",
  },
  animate: {
    y: "0rem",
  },
  exit: {
    y: "-0.5rem",
  },
};

const Modal = ({ handleDeleteTicket, setModalOpen, modalOpen }) => {
  return (
    <Backdrop>
      <AnimatePresence>
        <motion.div
          variants={modalVariant}
          initial="initial"
          animate="animate"
          exit="initial"
          className="w-4/5 sm:w-1/3 md:w-1/4 h-40 shadow-md bg-gray-100 rounded flex flex-col items-center justify-center"
        >
          <h2 className="text-gray-900 text-xl font-bold mb-10">
            Are you sure?
          </h2>
          <div className="flex">
            <button
              onClick={handleDeleteTicket}
              className="w-20 bg-red-500 hover:bg-red-600 text-white font-bold mr-6 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Yes
            </button>
            <button
              onClick={() => setModalOpen(!modalOpen)}
              className="w-20 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              No
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Backdrop>
  );
};

export default Modal;
