import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorSwatchesProps {
  colors: string[];
  getColorInFormat: (color: string) => string;
  copyToClipboard: (text: string, key: "colors") => void;
}

export const ColorSwatches: React.FC<ColorSwatchesProps> = ({
  colors,
  getColorInFormat,
  copyToClipboard,
}) => (
  <div className="flex flex-wrap gap-2">
    {colors.map((color, index) => (
      <Tooltip key={index}>
        <TooltipTrigger asChild>
          <motion.div
            className="hoverd h-6 w-6 cursor-pointer rounded-full border border-border"
            style={{ backgroundColor: color }}
            onClick={() => copyToClipboard(getColorInFormat(color), "colors")}
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
);
