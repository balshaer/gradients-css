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
  <div className="flex w-full items-start justify-between">
    <div className="flex-1 min-w-0 pr-4">
      <h3 className="text-lg sm:text-xl font-bold text-primary truncate leading-tight">{name}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mt-2">Gradient Colors</p>
    </div>
    <div className="flex items-center gap-1 flex-shrink-0">
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
