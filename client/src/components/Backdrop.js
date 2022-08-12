import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children }) => {
  return (
    <motion.div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-70">
      {children}
    </motion.div>
  );
};

export default Backdrop;
