import { motion } from "framer-motion";

interface GradientPreviewProps {
  style: React.CSSProperties;
  gradientType: "background" | "text";
  gradient: { name: string; colors: string[] };
}

export const GradientPreview: React.FC<GradientPreviewProps> = ({
  style,
  gradientType,
  gradient,
}) => {
  const glowColor = gradient.colors[0];

  return (
    <header className="relative w-full">
      <div
        className="absolute inset-0 opacity-50 blur-[42px]"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 30%)`,
          transform: "translate(-25%, -25%) scale(1.5)",
        }}
      />
      <motion.div
        className="relative left-0 right-0 m-auto mt-6 flex h-48 w-48 items-center justify-center overflow-hidden rounded-full"
        style={gradientType === "background" ? { ...style } : {}}
        transition={{ duration: 0.3 }}
      >
        {gradientType === "text" ? (
          <motion.span
            className="text-4xl font-bold"
            style={style}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {gradient.name}
          </motion.span>
        ) : (
          <motion.span
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* {gradient.name} */}
          </motion.span>
        )}
      </motion.div>
    </header>
  );
};
