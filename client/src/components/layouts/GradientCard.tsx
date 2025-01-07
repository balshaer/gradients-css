import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Heart, ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Slider } from "../ui/slider";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { toast } from "@/hooks/use-toast";
import { MagicCard } from "../ui/MagicCard";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GradientCardProps {
  gradient: { name: string; colors: string[] };
  isFavorite: boolean;
  onFavoriteToggle: (name: string) => void;
  favoriteCount: number;
}

const colorUtils = {
  hexToRGB: (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  },

  rgbToHSL: (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
          break;
        case g:
          h = ((b - r) / d + 2) * 60;
          break;
        case b:
          h = ((r - g) / d + 4) * 60;
          break;
      }
    }
    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }
};

export default function GradientCard({
  gradient,
  isFavorite,
  onFavoriteToggle,
}: GradientCardProps) {
  const [activeTab, setActiveTab] = useState("tailwind");
  const [angle, setAngle] = useState(90);
  const [selectedColorFormat, setSelectedColorFormat] = useState("HEX");
  const [copiedStates, setCopiedStates] = useState({
    tailwind: false,
    css: false,
    sass: false,
    bootstrap: false,
    colors: false,
  });

  const colorFormats = ["HEX", "RGB", "HSL"];

  const getColorInFormat = (color: string) => {
    switch (selectedColorFormat) {
      case "RGB": {
        const { r, g, b } = colorUtils.hexToRGB(color);
        return `rgb(${r}, ${g}, ${b})`;
      }
      case "HSL": {
        const { r, g, b } = colorUtils.hexToRGB(color);
        const { h, s, l } = colorUtils.rgbToHSL(r, g, b);
        return `hsl(${h}, ${s}%, ${l}%)`;
      }
      default:
        return color.toUpperCase(); 
    }
  };

  const copyToClipboard = (text: string, key: keyof typeof copiedStates) => {
    navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    toast({
      title: "🎉Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopiedStates({
        tailwind: false,
        css: false,
        sass: false,
        bootstrap: false,
        colors: false,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [copiedStates]);

  const getCodePreview = () => {
    const formattedColors = gradient.colors.map((color) =>
      getColorInFormat(color),
    );
    return {
      backgroundImage: `linear-gradient(${angle}deg, ${formattedColors.join(
        ", ",
      )})`,
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

    switch (format) {
      case "tailwind":
        if (hasMiddleColor) {
          return `bg-gradient-to-r from-[${firstColor}] via-[${middleColor}] to-[${lastColor}]`;
        } else {
          return `bg-gradient-to-r from-[${firstColor}] to-[${lastColor}]`;
        }
      case "css":
        return `background-image: linear-gradient(${angle}deg, ${formattedColors.join(", ")});`;
      case "sass":
        return `// Gradient using ${selectedColorFormat} colors
$color-1: ${firstColor};
${hasMiddleColor ? `$color-2: ${middleColor};` : ""}
$color-final: ${lastColor};
$gradient-angle: ${angle}deg;
background-image: linear-gradient(
  $gradient-angle,
  $color-1,
  ${hasMiddleColor ? "$color-2," : ""}
  $color-final
);`;
      case "bootstrap":
        return `// Bootstrap gradient using ${selectedColorFormat} colors
$gradient-degrees: ${angle};
$start-color: ${firstColor};
${hasMiddleColor ? `$middle-color: ${middleColor};` : ""}
$end-color: ${lastColor};

.gradient {
  background-image: linear-gradient(
    #{$gradient-degrees}deg,
    $start-color,
    ${hasMiddleColor ? "$middle-color," : ""}
    $end-color
  );
}`;
      default:
        return "";
    }
  };

  const { theme } = useTheme();

  return (
    <MagicCard
      gradientColor={theme === "dark" ? "#262626" : "#282828"}
      className="overflow-hidden transition-all duration-300"
    >
      <header className="w-full">
        <motion.div
          className="relative left-0 right-0 m-auto mt-6 h-48 w-48 rounded-full border-border"
          style={getCodePreview()}
          transition={{ duration: 0.3 }}
        >
        </motion.div>
      </header>
      <footer className="flex flex-col items-start space-y-4 p-4">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">
            {gradient.name}
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <motion.button
                  className="rounded-full p-2 transition-colors"
                  onClick={() => onFavoriteToggle(gradient.name)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      isFavorite
                        ? "fill-current text-red-400"
                        : "text-gray-400",
                    )}
                  />
                </motion.button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {gradient.colors.map((color, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <motion.div
                    className="hoverd h-6 w-6 cursor-pointer rounded-full border border-border"
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      copyToClipboard(getColorInFormat(color), "colors")
                    }
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-muted-foreground">
                    Click to copy: {getColorInFormat(color)}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex">
              <div className="flex w-24 items-center justify-between rounded-md border border-border bg-secondary p-2 text-sm text-primary">
                <span>{selectedColorFormat}</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-24 rounded-md border border-border bg-secondary p-1">
              {colorFormats.map((format) => (
                <DropdownMenuItem
                  key={format}
                  onSelect={() => setSelectedColorFormat(format)}
                  className="cursor-pointer rounded px-2 py-1.5 text-sm text-primary hover:bg-primary/10"
                >
                  {format}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex w-full items-center space-x-2">
          <Slider
            value={[angle]}
            onValueChange={(value) => setAngle(value[0])}
            max={360}
            step={1}
            className="flex-grow"
          />
          <span className="text-sm font-medium text-primary">{angle}°</span>
          <FaArrowRotateLeft
            className="flex h-full cursor-pointer items-center justify-center text-primary"
            onClick={() => setAngle(90)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative w-full">
            <div className="flex items-center justify-between rounded-md border border-border bg-secondary p-2 text-sm text-primary">
              <span>{activeTab}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-md border border-border bg-secondary p-1">
            {["tailwind", "css", "sass", "bootstrap"].map((format) => (
              <DropdownMenuItem
                key={format}
                onSelect={() => setActiveTab(format)}
                className="cursor-pointer rounded px-2 py-1.5 text-sm text-primary hover:bg-primary/10"
              >
                {format.charAt(0).toUpperCase() + format.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative mt-2 w-full">
          <pre className="w-full overflow-hidden rounded-md border border-border bg-secondary p-2 text-xs text-muted-foreground">
            {getCode(activeTab)}
          </pre>
          <button
            className="absolute right-0 top-0 flex h-full w-[30px] items-center justify-center border border-border bg-secondary p-0 text-primary"
            onClick={() =>
              copyToClipboard(
                getCode(activeTab),
                activeTab as keyof typeof copiedStates,
              )
            }
          >
            <AnimatePresence>
              {copiedStates[activeTab as keyof typeof copiedStates] ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="text-success h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Copy className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </footer>
    </MagicCard>
  );
}