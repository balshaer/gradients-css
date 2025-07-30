import React, { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RoughNotation } from "react-rough-notation";
import { FaMobileAlt, FaPaintBrush, FaLaptopCode, FaImage, FaGlobe } from "react-icons/fa";

// -- Custom hook for mobile detection --
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25,
    },
  },
};
const badgeVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.6 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 440, damping: 24 } },
};

interface FeatureBadgeProps {
  icon?: React.ReactNode;
  text: string;
  className?: string;
  highlight?: boolean;
}

const FeatureBadge: React.FC<FeatureBadgeProps> = memo(({ icon, text, className, highlight }) => {
  const isMobile = useIsMobile(); // Default breakpoint 640px (Tailwind sm)
  return (
    <motion.div
      className={`relative flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ${className || ""}`}
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
    >
      {icon && (
        <span role="img" aria-label={text} className="mr-1 flex items-center">
          {icon}
        </span>
      )}
      {highlight ? (
        <RoughNotation
          type="circle"
          show={true}
          color="#edf0f1" // Brand highlight color
          padding={isMobile ? 7 : 14} // Responsive padding
          animationDuration={750}
        >
          <span>{text}</span>
        </RoughNotation>
      ) : (
        <span>{text}</span>
      )}
    </motion.div>
  );
});

export const HeroFeatures: React.FC = () => {
  const features = [
    { icon: <FaMobileAlt size={16} color="#007aff" />, text: "iOS & Android" },
    { icon: <FaPaintBrush size={16} color="#e95946" />, text: "Figma & Sketch" },
    { icon: <FaLaptopCode size={16} color="#20c997" />, text: "CSS & SCSS" },
    { icon: <FaImage size={16} color="#f9ca24" />, text: "PNG & SVG" },
    { icon: <FaGlobe size={16} color="#845ef7" />, text: "JSON Export" },
    { icon: null, text: "and more soon", highlight: true }, // Highlight this one!
  ];

  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-2 pt-4 pb-2"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
    >
      {features.map((feature, idx) => (
        <FeatureBadge
          key={feature.text + idx}
          icon={feature.icon}
          text={feature.text}
          highlight={Boolean(feature.highlight)}
        />
      ))}
    </motion.div>
  );
};
