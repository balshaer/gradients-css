import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/ui/MagicCard";
import { GradientPreview } from "./GradientPreview";
import { GradientHeader } from "./GradientHeader";
import { GradientCardFooter } from "./GradientCardFooter";
import { useColorFormat } from "@/hooks/useColorFormat";
import { useCopyState } from "@/hooks/useCopyState";

import { GradientCardProps } from "@/types/types";
import { ExportModal } from "../layouts/ExportModal";
import { GradientData } from "@/utils/exportUtils";
import { animatedGradientUtils, AnimatedGradientOptions } from "@/utils/animatedGradientUtils";

export default function GradientCard({
  gradient,
  isFavorite,
  onFavoriteToggle,
}: GradientCardProps) {
  const [angle, setAngle] = useState(90);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const {
    selectedColorFormat,
    setSelectedColorFormat,
    getColorInFormat,
    gradientType,
    setGradientType,
  } = useColorFormat();
  const { copiedStates, copyToClipboard } = useCopyState(gradient.name, gradient.colors);

  const colorFormats = ["HEX", "RGB", "HSL"];

  // Create gradient data for export
  const gradientData: GradientData = {
    name: gradient.name,
    colors: gradient.colors,
    angle: angle,
    type: gradientType,
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  const getCodePreview = () => {
    const formattedColors = gradient.colors.map((color) =>
      getColorInFormat(color),
    );
    const gradientStyle = `linear-gradient(${angle}deg, ${formattedColors.join(", ")})`;

    if (gradientType === "background") {
      return isAnimated ? {
        backgroundImage: gradientStyle,
        backgroundSize: "400% 400%",
        animation: `gradientShift ${4 / animationSpeed}s ease infinite`,
      } : { backgroundImage: gradientStyle };
    } else {
      return isAnimated ? {
        color: "transparent",
        backgroundImage: gradientStyle,
        backgroundSize: "400% 400%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        animation: `gradientShift ${4 / animationSpeed}s ease infinite`,
      } : {
        color: "transparent",
        backgroundImage: gradientStyle,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      };
    }
  };

  const getCode = (format: string) => {
    const formattedColors = gradient.colors.map((color) =>
      getColorInFormat(color),
    );

    const animatedOptions: AnimatedGradientOptions = {
      colors: formattedColors,
      angle,
      isAnimated,
      animationSpeed,
      gradientType,
    };

    switch (format) {
      case "tailwind":
        return animatedGradientUtils.generateAnimatedTailwind(animatedOptions);
      case "css":
        return animatedGradientUtils.generateAnimatedCSS(animatedOptions);
      case "sass":
        return animatedGradientUtils.generateAnimatedSass(animatedOptions);
      case "bootstrap":
        return animatedGradientUtils.generateAnimatedBootstrap(animatedOptions);
      case "xml":
        return animatedGradientUtils.generateAnimatedXML(animatedOptions);
      case "svg":
        return animatedGradientUtils.generateAnimatedSVG(animatedOptions);
      case "json":
        return animatedGradientUtils.generateAnimatedJSON(animatedOptions);
      default: {
        const gradientStyle = `linear-gradient(${angle}deg, ${formattedColors.join(", ")})`;
        return gradientType === "background"
          ? `background-image: ${gradientStyle};`
          : `color: transparent;
background-image: ${gradientStyle};
-webkit-background-clip: text;
background-clip: text;`;
      }
    }
  };

  const handleFavoriteToggle = () => {
    onFavoriteToggle(gradient.name);
  };

  const { theme } = useTheme();

  return (
    <MagicCard
      gradientColor={theme === "dark" ? "#262626" : "#282828"}
      className="w-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group"
    >
      <div className="flex flex-col h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={gradientType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <GradientPreview
              style={getCodePreview()}
              gradientType={gradientType}
              gradient={gradient}
              isAnimated={isAnimated}
              animationSpeed={animationSpeed}
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm border-t border-border/50 space-y-6">
          <GradientHeader
            name={gradient.name}
            isFavorite={isFavorite}
            onFavoriteToggle={handleFavoriteToggle}
            onExport={handleExport}
          />

          <GradientCardFooter
            gradient={gradient}
            getColorInFormat={getColorInFormat}
            copyToClipboard={copyToClipboard}
            selectedColorFormat={selectedColorFormat}
            setSelectedColorFormat={setSelectedColorFormat}
            colorFormats={colorFormats}
            gradientType={gradientType}
            setGradientType={setGradientType}
            angle={angle}
            setAngle={setAngle}
            getCode={getCode}
            copiedStates={copiedStates}
            isAnimated={isAnimated}
            setIsAnimated={setIsAnimated}
            animationSpeed={animationSpeed}
            setAnimationSpeed={setAnimationSpeed}
          />
        </div>
      </div>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        gradientData={gradientData}
      />
    </MagicCard>
  );
}
