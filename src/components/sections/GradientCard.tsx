// @TODO : Make a new feat allow users copy code as animation

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MagicCard } from "@/components/ui/MagicCard";
import { GradientPreview } from "./GradientPreview";
import { GradientHeader } from "./GradientHeader";
import { ColorSwatches } from "../controls/ColorSwatches";
import { AngleSlider } from "../controls/AngleSlider";
import { GradientTypeSelector } from "../controls/GradientTypeSelector";
import { useColorFormat } from "@/hooks/useColorFormat";
import { useCopyState } from "@/hooks/useCopyState";

import { GradientCardProps } from "@/types/types";
import { CodePreview } from "../layouts/CodePreview";

export default function GradientCard({
  gradient,
  isFavorite,
  onFavoriteToggle,
}: GradientCardProps) {
  const [activeTab, setActiveTab] = useState("tailwind");
  const [angle, setAngle] = useState(90);
  const {
    selectedColorFormat,
    setSelectedColorFormat,
    getColorInFormat,
    gradientType,
    setGradientType,
  } = useColorFormat();
  const { copiedStates, copyToClipboard } = useCopyState();

  const colorFormats = ["HEX", "RGB", "HSL"];

  const getCodePreview = () => {
    const formattedColors = gradient.colors.map((color) =>
      getColorInFormat(color),
    );
    const gradientStyle = `linear-gradient(${angle}deg, ${formattedColors.join(", ")})`;
    return gradientType === "background"
      ? { backgroundImage: gradientStyle }
      : {
          color: "transparent",
          backgroundImage: gradientStyle,
          WebkitBackgroundClip: "text",
        };
  };

  const getCode = (format: string) => {
    const formattedColors = gradient.colors.map((color) =>
      getColorInFormat(color),
    );
    const firstColor = formattedColors[0];
    const lastColor = formattedColors[formattedColors.length - 1];
    const hasMiddleColor = formattedColors.length === 3;
    const middleColor = hasMiddleColor ? formattedColors[1] : null;

    const gradientStyle = `linear-gradient(${angle}deg, ${formattedColors.join(", ")})`;

    switch (format) {
      case "tailwind":
        if (gradientType === "background") {
          return hasMiddleColor
            ? `bg-gradient-to-r from-[${firstColor}] via-[${middleColor}] to-[${lastColor}]`
            : `bg-gradient-to-r from-[${firstColor}] to-[${lastColor}]`;
        } else {
          return `text-transparent bg-clip-text bg-gradient-to-r from-[${firstColor}] ${hasMiddleColor ? `via-[${middleColor}] ` : ""}to-[${lastColor}]`;
        }
      case "css":
        return gradientType === "background"
          ? `background-image: ${gradientStyle};`
          : `color: transparent;
background-image: ${gradientStyle};
-webkit-background-clip: text;
background-clip: text;`;
      case "sass":
        return `// Gradient using ${selectedColorFormat} colors
$color-1: ${firstColor};
${hasMiddleColor ? `$color-2: ${middleColor};` : ""}
$color-final: ${lastColor};
$gradient-angle: ${angle}deg;
${gradientType === "background" ? "background-image" : "color"}: linear-gradient(
  $gradient-angle,
  $color-1,
  ${hasMiddleColor ? "$color-2," : ""}
  $color-final
);
${
  gradientType === "text"
    ? `
color: transparent;
background-image: linear-gradient(
  $gradient-angle,
  $color-1,
  ${hasMiddleColor ? "$color-2," : ""}
  $color-final
);
-webkit-background-clip: text;
background-clip: text;`
    : ""
}`;
      case "bootstrap":
        return `// Bootstrap gradient using ${selectedColorFormat} colors
$gradient-degrees: ${angle};
$start-color: ${firstColor};
${hasMiddleColor ? `$middle-color: ${middleColor};` : ""}
$end-color: ${lastColor};

.gradient {
  ${
    gradientType === "background"
      ? `
  background-image: linear-gradient(
    #{$gradient-degrees}deg,
    $start-color,
    ${hasMiddleColor ? "$middle-color," : ""}
    $end-color
  );`
      : `
  color: transparent;
  background-image: linear-gradient(
    #{$gradient-degrees}deg,
    $start-color,
    ${hasMiddleColor ? "$middle-color," : ""}
    $end-color
  );
  -webkit-background-clip: text;
  background-clip: text;`
  }
}`;
      default:
        return "";
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
          />
        </motion.div>
      </AnimatePresence>
      <footer className="flex flex-col items-start space-y-4 p-4">
        <div className="flex w-full items-center justify-between">
          <GradientHeader
            name={gradient.name}
            isFavorite={isFavorite}
            onFavoriteToggle={handleFavoriteToggle}
          />
        </div>

        <div className="flex w-full items-center justify-between gap-2">
          <ColorSwatches
            colors={gradient.colors}
            getColorInFormat={getColorInFormat}
            copyToClipboard={(text, key) => {
              copyToClipboard(text, key);
            }}
          />

          <div className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger className="nofocus inline-flex">
                <div className="flex w-24 items-center justify-between rounded-md border border-border bg-secondary p-2 text-sm text-primary">
                  <span>{selectedColorFormat}</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-24 rounded-md border border-border bg-secondary p-1"
              >
                {colorFormats.map((format) => (
                  <DropdownMenuItem
                    key={format}
                    onSelect={() => {
                      setSelectedColorFormat(format);
                    }}
                    className="hover:bg-primary/10 cursor-pointer rounded px-2 py-1.5 text-sm text-primary"
                  >
                    {format}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div>{/* <Checkbox /> */}</div>

            <GradientTypeSelector
              gradientType={gradientType}
              setGradientType={(type) => {
                setGradientType(type);
              }}
            />
          </div>
        </div>

        <AngleSlider
          angle={angle}
          setAngle={(newAngle) => {
            setAngle(newAngle);
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="nofocus relative w-full">
            <div className="flex items-center justify-between rounded-md border border-border bg-secondary p-2 text-sm text-primary">
              <span>{activeTab}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 rounded-md border border-border bg-secondary p-1"
          >
            {["tailwind", "css", "sass", "bootstrap"].map((format) => (
              <DropdownMenuItem
                key={format}
                onSelect={() => {
                  setActiveTab(format);
                }}
                className="hover:bg-primary/10 cursor-pointer rounded px-2 py-1.5 text-sm text-primary"
              >
                {format.charAt(0).toUpperCase() + format.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CodePreview
          code={getCode(activeTab)}
          copiedStates={copiedStates}
          activeTab={activeTab}
          copyToClipboard={(text, key) => {
            copyToClipboard(text, key);
          }}
        />
      </footer>
    </MagicCard>
  );
}
