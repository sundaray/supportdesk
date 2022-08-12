import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const Error = ({ error }) => {
  return (
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
  );
};

export default Error;
