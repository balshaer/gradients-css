// @TODO : Make a new feat allow users copy code as animation

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
  const { copiedStates, copyToClipboard } = useCopyState();

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
      default:
        const gradientStyle = `linear-gradient(${angle}deg, ${formattedColors.join(", ")})`;
        return gradientType === "background"
          ? `background-image: ${gradientStyle};`
          : `color: transparent;
background-image: ${gradientStyle};
-webkit-background-clip: text;
background-clip: text;`;
    }
  };

  const handleFavoriteToggle = () => {
    onFavoriteToggle(gradient.name);
  };

  const { theme } = useTheme();

  return (
    <MagicCard
      gradientColor={theme === "dark" ? "#262626" : "#282828"}
      className="overflow-hidden transition-all duration-300"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={gradientType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
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
      <footer className="flex flex-col items-start space-y-4 p-4 w-full max-w-full">
        <div className="flex w-full items-center justify-between">
          <GradientHeader
            name={gradient.name}
            isFavorite={isFavorite}
            onFavoriteToggle={handleFavoriteToggle}
            onExport={handleExport}
          />
        </div>

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
      </footer>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        gradientData={gradientData}
      />
    </MagicCard>
  );
}
