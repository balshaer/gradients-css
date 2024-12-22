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

export default function GradientCard({
  gradient,
  isFavorite,
  onFavoriteToggle,
}: GradientCardProps) {
  const [activeTab, setActiveTab] = useState("tailwind");
  const [angle, setAngle] = useState(90);
  const [copiedStates, setCopiedStates] = useState({
    tailwind: false,
    css: false,
    sass: false,
    bootstrap: false,
    colors: false,
  });

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

  const getCode = (format: string) => {
    switch (format) {
      case "tailwind":
        return `bg-gradient-to-r from-[${gradient.colors[0]}] to-[${gradient.colors[gradient.colors.length - 1]}]`;
      case "css":
        return `background-image: linear-gradient(${angle}deg, ${gradient.colors.join(", ")});`;
      case "sass":
        return `$gradient-colors: ${gradient.colors.join(", ")};\n$gradient-angle: ${angle}deg;\n\nbackground-image: linear-gradient($gradient-angle, $gradient-colors);`;
      case "bootstrap":
        return `$gradient: linear-gradient(${angle}deg, ${gradient.colors.join(", ")});\n\n.custom-gradient {\n  background-image: $gradient;\n}`;
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
          className="left-0 right-0 m-auto mt-6 h-48 w-48 rounded-full border-border"
          style={{
            backgroundImage: `linear-gradient(${angle}deg, ${gradient.colors.join(", ")})`,
          }}
          transition={{ duration: 0.3 }}
        />
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
                {/* <Badge variant="secondary" className="ml-2">
                  {favoriteCount}
                </Badge> */}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex w-full flex-wrap gap-2">
          {gradient.colors.map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <motion.div
                  className="hoverd h-6 w-6 cursor-pointer rounded-full border border-border"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color, "colors")}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-muted-foreground">Click to copy: {color}</p>
              </TooltipContent>
            </Tooltip>
          ))}
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
              <span> {activeTab} </span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <DropdownMenuContent className="absolute left-0 right-0 ml-10 w-full border border-border bg-card">
              {["tailwind", "css", "sass", "bootstrap"].map((format) => (
                <DropdownMenuItem
                  key={format}
                  onSelect={() => setActiveTab(format)}
                >
                  {format.charAt(0).toUpperCase() + format.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenuTrigger>
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
