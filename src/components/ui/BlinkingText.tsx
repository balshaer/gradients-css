import { motion } from "framer-motion";

interface BlinkingTextProps {
  children: React.ReactNode;
  className?: string;
}

export const BlinkingText: React.FC<BlinkingTextProps> = ({ children, className = "" }) => {
  return (
    <motion.span
      className={className}
      animate={{
        color: ["#3B82F6", "#60A5FA", "#93C5FD", "#3B82F6"], // Blue color variations
        textShadow: [
          "0 0 5px #3B82F6",
          "0 0 10px #60A5FA",
          "0 0 15px #93C5FD",
          "0 0 5px #3B82F6"
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.span>
  );
};
