import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/outline";

const errorVariant = {
  initial: {
    opacity: 0,
    y: "-0.1rem",
  },
  animate: {
    opacity: 1,
    x: "0rem",
  },
  exit: {
    opacity: 0,
    y: "-0.1rem",
  },
};

const ErrorFormSubmission = ({ error, setError }) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          variants={errorVariant}
          initial="initial"
          animate="animate"
          exit="initial"
          className="flex justify-between items-center w-11/12  md:w-3/5 xl:w-2/5 h-10 mb-4 bg-red-400 shadow-md rounded px-4 py-2 m-auto"
        >
          <p className="text-center">{error}</p>
          <XCircleIcon
            className="w-5 h-5 hover:text-gray-50"
            style={{ cursor: "pointer" }}
            onClick={() => setError(null)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorFormSubmission;
