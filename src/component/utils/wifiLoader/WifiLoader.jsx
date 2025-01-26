import React from "react";
import { motion } from "framer-motion";

const WifiLoader = () => {
  return (
    <div className="">
      <motion.div
        className="relative h-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2}}
      >
        <span className="absolute block w-3.5 h-3.5 bg-blue-500 rounded-full animate-ping" />
        <span className="absolute inset-0 w-6 h-6 border-2 border-blue-500 border-opacity-50 rounded-full animate-ping" />
        <span className="absolute inset-0 w-8 h-8 border-2 border-blue-400 border-opacity-40 rounded-full animate-ping" />
        <span className="absolute inset-0 w-10 h-10 border-2 border-blue-300 border-opacity-30 rounded-full animate-ping" />
        {/* <span className="absolute inset-0 w-full h-full bg-blue-600 rounded-full opacity-75" /> */}
      </motion.div>
    </div>
  );
};

export default WifiLoader;