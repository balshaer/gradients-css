import { motion } from "framer-motion";
import { FaArrowRotateLeft } from "react-icons/fa6";

interface ResetBackgroundProps {
  setBackground: (background: string) => void;
}

export default function ResetBackground({
  setBackground,
}: ResetBackgroundProps) {
  return (
    <motion.div
      className="fixed bottom-4 right-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <motion.span
        onClick={() => setBackground("")}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer"
        aria-label="Reset background"
      >
        <FaArrowRotateLeft />
      </motion.span>
    </motion.div>
  );
}
