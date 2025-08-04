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
    const baseClasses = "relative flex items-center justify-center overflow-hidden transition-all duration-300";
    
    switch (previewShape) {
      case "circle":
        return (
          <motion.div
            className={`${baseClasses} h-48 w-48 rounded-full`}
            style={gradientType === "background" ? animatedStyle : {}}
            transition={{ duration: 0.3 }}
          >
            {gradientType === "text" ? (
              <motion.span
                className="text-2xl font-bold"
                style={textGradientStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {gradient.name.slice(0, 8)}
              </motion.span>
            ) : (
              <motion.span
                className="text-2xl font-bold text-white mix-blend-difference"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {gradient.name.slice(0, 8)}
              </motion.span>
            )}
          </motion.div>
        );

      case "square":
        return (
          <motion.div
            className={`${baseClasses} h-48 w-48 rounded-lg`}
            style={gradientType === "background" ? animatedStyle : {}}
            transition={{ duration: 0.3 }}
          >
            {gradientType === "text" ? (
              <motion.span
                className="text-2xl font-bold"
                style={textGradientStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {gradient.name.slice(0, 8)}
              </motion.span>
            ) : (
              <motion.span
                className="text-2xl font-bold text-white mix-blend-difference"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {gradient.name.slice(0, 8)}
              </motion.span>
            )}
          </motion.div>
        );

      case "card":
        return (
          <motion.div
            className={`${baseClasses} h-32 w-52 rounded-xl shadow-lg border border-white/20`}
            style={gradientType === "background" ? animatedStyle : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 text-center">
              {gradientType === "text" ? (
                <motion.h3
                  className="text-lg font-semibold"
                  style={textGradientStyle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {gradient.name}
                </motion.h3>
              ) : (
                <motion.h3
                  className="text-lg font-semibold text-white mix-blend-difference"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {gradient.name}
                </motion.h3>
              )}
              <p className="text-sm text-white/80 mt-1">Card Preview</p>
            </div>
          </motion.div>
        );

      case "button":
        return (
          <motion.button
            className={`${baseClasses} h-12 px-8 rounded-lg font-medium shadow-lg hover:scale-105 transition-transform`}
            style={gradientType === "background" ? animatedStyle : {}}
            transition={{ duration: 0.3 }}
          >
            {gradientType === "text" ? (
              <motion.span
                style={textGradientStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {gradient.name}
              </motion.span>
            ) : (
              <motion.span
                className="text-white mix-blend-difference"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {gradient.name}
              </motion.span>
            )}
          </motion.button>
        );

      case "text":
        return (
          <motion.div
            className="flex items-center justify-center h-48 w-full"
            transition={{ duration: 0.3 }}
          >
            <motion.h1
              className="text-6xl font-bold text-center"
              style={gradientType === "text" ? textGradientStyle : { ...animatedStyle, color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {gradient.name}
            </motion.h1>
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
      <div className="relative z-10 flex justify-center mb-4">
        <div className="flex gap-1 p-1 bg-black/20 rounded-lg backdrop-blur-sm border border-white/10">
          {shapeOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.key}
                onClick={() => setPreviewShape(option.key)}
                variant={previewShape === option.key ? "default" : "ghost"}
                size="sm"
                className={`h-8 w-8 p-0 ${
                  previewShape === option.key 
                    ? "bg-white/20 text-white" 
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                title={option.label}
              >
                <IconComponent className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </div>

      {/* Preview container */}
      <div className="relative flex justify-center items-center min-h-[200px]">
        {renderPreview()}
      </div>
    </header>
  );
};
