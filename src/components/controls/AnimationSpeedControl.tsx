import { motion } from "framer-motion";
import { Gauge } from "lucide-react";

interface AnimationSpeedControlProps {
  speed: number;
  onChange: (speed: number) => void;
  disabled?: boolean;
  className?: string;
}

export const AnimationSpeedControl: React.FC<AnimationSpeedControlProps> = ({
  speed,
  onChange,
  disabled = false,
  className = "",
}) => {
  const speedOptions = [
    { value: 0.5, label: "Slow" },
    { value: 1, label: "Normal" },
    { value: 2, label: "Fast" },
    { value: 3, label: "Very Fast" },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Gauge className="h-4 w-4 text-white/70" />
      <div className="flex items-center gap-1">
        {speedOptions.map((option) => (
          <motion.button
            key={option.value}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              speed === option.value
                ? "bg-blue-500 text-white"
                : "bg-secondary text-white/90 hover:bg-primary/10"
            } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => !disabled && onChange(option.value)}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            disabled={disabled}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
