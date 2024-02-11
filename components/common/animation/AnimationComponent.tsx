import React from "react";
import { motion } from "framer-motion";

interface AnimationProps {
  children: React.ReactNode;
}

const AnimationComponent: React.FC<AnimationProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationComponent;
