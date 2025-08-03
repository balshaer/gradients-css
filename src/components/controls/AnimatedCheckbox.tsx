import { motion } from "framer-motion";
import { Check, Play } from "lucide-react";

interface AnimatedCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const AnimatedCheckbox: React.FC<AnimatedCheckboxProps> = ({
  checked,
  onChange,
  label = "Animate Gradient",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.button
        className={`relative flex h-5 w-5 items-center justify-center rounded border-2 transition-colors ${
          checked
            ? "border-blue-500 bg-blue-500"
            : "border-gray-300 bg-transparent hover:border-blue-400"
        }`}
        onClick={() => onChange(!checked)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: checked ? 1 : 0,
            opacity: checked ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Check className="h-3 w-3 text-white" />
        </motion.div>
      </motion.button>
      
      <motion.div
        className="flex items-center gap-1 text-sm text-white/90"
        whileHover={{ scale: 1.02 }}
      >
        <Play className="h-3 w-3" />
        <span>{label}</span>
      </motion.div>
    </div>
  );
};
