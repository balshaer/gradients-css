import { motion } from "framer-motion";
import { Heart, Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface GradientHeaderProps {
  name: string;
  isFavorite: boolean;
  onFavoriteToggle: (name: string) => void;
  onExport?: () => void;
}

export const GradientHeader: React.FC<GradientHeaderProps> = ({
  name,
  isFavorite,
  onFavoriteToggle,
  onExport,
}) => (
  <div className="flex w-full items-center justify-between">
    <h3 className="text-lg font-semibold text-primary">{name}</h3>
    <div className="flex items-center gap-0">
      {onExport && (
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              className="rounded-full p-2 transition-colors hover:bg-muted"
              onClick={onExport}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download className="h-4 w-4 text-gray-400 hover:text-primary" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Export gradient</p>
          </TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            className="rounded-full p-2 transition-colors hover:bg-muted"
            onClick={() => onFavoriteToggle(name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isFavorite ? "fill-current text-red-400" : "text-gray-400 hover:text-red-400",
              )}
            />
          </motion.button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </div>
);
