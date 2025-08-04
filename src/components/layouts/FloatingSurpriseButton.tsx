import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";

interface FloatingSurpriseButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const buttonVariants = {
  initial: { scale: 1, rotate: 0 },
  animate: { scale: 1.05, rotate: 5 },
  exit: { scale: 1, rotate: 0 }
};

export function FloatingSurpriseButton({ onClick, disabled = false }: FloatingSurpriseButtonProps) {
  return (
    <motion.button
      type="button"
      title="Surprise Me - Random Gradient"
      aria-label="Get Random Gradient"
      onClick={onClick}
      disabled={disabled}
      tabIndex={0}
      initial="initial"
      whileHover="animate"
      variants={buttonVariants}
      whileTap={{ scale: 0.93 }}
      className={`
        fixed z-50 bottom-10 left-10 max-md:bottom-4 max-md:left-4
        flex items-center justify-center
        w-14 h-14 max-md:w-12 max-md:h-12
        rounded-full shadow-xl border border-border
        bg-primary text-primary-foreground
        hover:bg-primary/90 hover:shadow-2xl
        focus-visible:ring-4 focus-visible:ring-primary/30
        transition-all duration-300 outline-none
        disabled:opacity-50 disabled:cursor-not-allowed
        group
      `}
    >
      <motion.div
        animate={{ rotate: disabled ? 0 : 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="flex items-center justify-center"
      >
        <Shuffle 
          className="w-6 h-6 max-md:w-5 max-md:h-5 group-hover:scale-110 transition-transform duration-200" 
          aria-hidden="true" 
        />
      </motion.div>
    </motion.button>
  );
}