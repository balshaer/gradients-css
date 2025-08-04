import { motion } from "framer-motion";
import { Grid3X3 } from "lucide-react";

interface FloatingSurpriseButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  tooltip?: string;
}

const buttonVariants = {
  initial: { scale: 1, rotate: 0 },
  animate: { scale: 1.05, rotate: 3 },
  exit: { scale: 1, rotate: 0 }
};

export function FloatingSurpriseButton({ 
  onClick, 
  disabled = false, 
  isActive = false,
  tooltip = "Mood Board - Random Selection"
}: FloatingSurpriseButtonProps) {
  return (
    <motion.button
      type="button"
      title={tooltip}
      aria-label="Generate Mood Board"
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
        ${isActive 
          ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white' 
          : 'bg-primary text-primary-foreground'
        }
        hover:bg-primary/90 hover:shadow-2xl
        focus-visible:ring-4 focus-visible:ring-primary/30
        transition-all duration-300 outline-none
        disabled:opacity-50 disabled:cursor-not-allowed
        group
      `}
    >
      <motion.div
        animate={{ scale: disabled ? 1 : [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        <Grid3X3 
          className="w-6 h-6 max-md:w-5 max-md:h-5 group-hover:scale-110 transition-transform duration-200" 
          aria-hidden="true" 
        />
      </motion.div>
    </motion.button>
  );
}