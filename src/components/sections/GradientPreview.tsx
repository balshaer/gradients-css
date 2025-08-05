import { motion } from "framer-motion";
import { useState } from "react";
import { Square, Circle, CreditCard, Type } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GradientPreviewProps {
  style: React.CSSProperties;
  gradientType: "background" | "text";
  gradient: { name: string; colors: string[] };
  isAnimated?: boolean;
  animationSpeed?: number;
}

type PreviewShape = "circle" | "square" | "card" | "button" | "text";

export const GradientPreview: React.FC<GradientPreviewProps> = ({
  style,
  gradientType,
  gradient,
  isAnimated = false,
  animationSpeed = 1,
}) => {
  const [previewShape, setPreviewShape] = useState<PreviewShape>("circle");
  const glowColor = gradient.colors[0];

  // Create animated style if animation is enabled
  const animatedStyle = isAnimated ? {
    ...style,
    backgroundSize: "400% 400%",
    animation: `gradientShift ${4 / animationSpeed}s ease infinite`,
  } : style;

  // For text gradients, ensure proper text styling
  const textGradientStyle = gradientType === "text" ? {
    ...animatedStyle,
    color: "transparent",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
  } : animatedStyle;

  const shapeOptions = [
    { key: "circle" as PreviewShape, icon: Circle, label: "Circle" },
    { key: "square" as PreviewShape, icon: Square, label: "Square" },
    { key: "card" as PreviewShape, icon: CreditCard, label: "Card" },
    { key: "button" as PreviewShape, icon: Square, label: "Button" },
    { key: "text" as PreviewShape, icon: Type, label: "Text" },
  ];

  const renderPreview = () => {
    const baseClasses = "relative flex items-center justify-center overflow-hidden transition-all duration-500 ease-out";
    
    switch (previewShape) {
      case "circle":
        return (
          <motion.div
            className={`${baseClasses} h-40 w-40 sm:h-48 sm:w-48 rounded-full shadow-2xl`}
            style={gradientType === "background" ? animatedStyle : {}}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {gradientType === "text" ? (
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-white/40 bg-white/20 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-10 h-10 rounded-full bg-white/30" />
              </motion.div>
            ) : (
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-white/40 bg-white/20 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-10 h-10 rounded-full bg-white/30" />
              </motion.div>
            )}
          </motion.div>
        );

      case "square":
        return (
          <motion.div
            className={`${baseClasses} h-40 w-40 sm:h-48 sm:w-48 rounded-xl shadow-2xl`}
            style={gradientType === "background" ? animatedStyle : {}}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {gradientType === "text" ? (
              <motion.div
                className="w-16 h-16 rounded-lg border-2 border-white/40 bg-white/20 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/30" />
              </motion.div>
            ) : (
              <motion.div
                className="w-16 h-16 rounded-lg border-2 border-white/40 bg-white/20 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/30" />
              </motion.div>
            )}
          </motion.div>
        );

      case "card":
        return (
          <motion.div
            className={`${baseClasses} h-28 w-44 sm:h-32 sm:w-52 rounded-2xl shadow-2xl border border-white/30`}
            style={gradientType === "background" ? animatedStyle : {}}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="p-4 text-center">
              <motion.div
                className="flex flex-col items-center justify-center space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 rounded-lg border-2 border-white/40 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-white/30" />
                </div>
                <p className="text-xs text-white/80">Card Preview</p>
              </motion.div>
            </div>
          </motion.div>
        );

      case "button":
        return (
          <motion.button
            className={`${baseClasses} h-12 px-6 sm:px-8 rounded-xl font-medium shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200`}
            style={gradientType === "background" ? animatedStyle : {}}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="px-4 py-2 rounded-md border border-white/40 bg-white/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white/90 text-sm font-medium">Button</span>
            </motion.div>
          </motion.button>
        );

      case "text":
        return (
          <motion.div
            className="flex items-center justify-center h-32 sm:h-48 w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              className="text-4xl sm:text-6xl font-bold text-center"
              style={gradientType === "text" ? textGradientStyle : { ...animatedStyle, color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Text
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <header className="relative w-full">
      <div
        className="absolute inset-0 opacity-50 blur-[42px]"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 30%)`,
          transform: "translate(-25%, -25%) scale(1.5)",
        }}
      />
      
      {/* Shape selector */}
      <div className="relative z-10 flex justify-center mb-6 px-2 sm:px-4">
        <div className="inline-flex items-center justify-center gap-1 sm:gap-0.5 p-1.5 sm:p-1 bg-black/30 rounded-xl sm:rounded-lg backdrop-blur-md border border-white/20 shadow-lg">
          {shapeOptions.map((option) => {
            const IconComponent = option.icon;
            const isActive = previewShape === option.key;
            return (
              <Button
                key={option.key}
                onClick={() => setPreviewShape(option.key)}
                variant="ghost"
                size="sm"
                className={`
                  relative h-11 w-11 sm:h-9 sm:w-9 md:h-8 md:w-8 
                  min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] md:min-h-[32px] md:min-w-[32px]
                  p-0 flex items-center justify-center shrink-0 
                  rounded-lg sm:rounded-md transition-all duration-200 ease-out
                  hover:scale-110 active:scale-95
                  ${
                    isActive
                      ? "bg-white/25 text-white shadow-lg shadow-white/10 ring-2 ring-white/30" 
                      : "text-white/70 hover:text-white hover:bg-white/15 hover:shadow-md"
                  }
                `}
                title={option.label}
                aria-label={`Switch to ${option.label} preview`}
              >
                <IconComponent className="h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0 transition-transform duration-200" />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-lg sm:rounded-md"
                    layoutId="activeShape"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Preview container */}
      <div className="relative flex justify-center items-center min-h-[200px] px-4">
        <div className="w-full max-w-md flex justify-center">
          {renderPreview()}
        </div>
      </div>
    </header>
  );
};
