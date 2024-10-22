import { motion, AnimatePresence } from "framer-motion";
import GradientCard from "./GradientCard";

interface GradientGridProps {
  gradients: Array<{ name: string; colors: string[] }>;
  favorites: string[];
  toggleFavorite: (name: string) => void;
  setBackground: (background: string) => void;
}

export default function GradientGrid({
  gradients,
  favorites,
  toggleFavorite,
}: GradientGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <AnimatePresence>
        {gradients.map((gradient) => (
          <motion.div
            key={gradient.name}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <GradientCard
              gradient={gradient}
              isFavorite={favorites.includes(gradient.name)}
              onFavoriteToggle={() => toggleFavorite(gradient.name)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
