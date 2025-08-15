import { motion } from "framer-motion";

/**
 * A compact loader designed to be used within buttons
 */
const ButtonLoader = () => {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className="absolute block w-1.5 h-1.5 bg-white rounded-full animate-ping" />
      <span className="absolute block w-3 h-3 border border-white border-opacity-70 rounded-full animate-ping" />
      <span className="absolute block w-4 h-4 border border-white border-opacity-50 rounded-full animate-ping" />
      <span className="h-4 w-4 opacity-0">Loading</span>{" "}
      {/* Invisible text to maintain button height */}
    </motion.div>
  );
};

export default ButtonLoader;
