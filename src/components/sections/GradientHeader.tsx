import { motion } from "framer-motion";
import { Heart } from "lucide-react";
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
}

export const GradientHeader: React.FC<GradientHeaderProps> = ({
  name,
  isFavorite,
  onFavoriteToggle,
}) => (
  <div className="flex w-full items-center justify-between">
    <h3 className="text-lg font-semibold text-primary">{name}</h3>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center">
          <motion.button
            className="rounded-full p-2 transition-colors"
            onClick={() => onFavoriteToggle(name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isFavorite ? "fill-current text-red-400" : "text-gray-400",
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
);
