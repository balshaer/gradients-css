import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (direction: "next" | "prev") => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <motion.div
      className="flex items-center justify-center gap-4 pt-16 max-md:py-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Button
        className="h-max w-max rounded-md border-border bg-card p-2 text-primary"
        onClick={() => onPageChange("prev")}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4 text-primary" />
      </Button>

      {/* Display current page out of total pages */}
      <motion.div
        className="text-sm font-semibold text-foreground/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {currentPage} / {totalPages}
      </motion.div>

      <Button
        className="h-max w-max rounded-md border-border bg-card p-2 text-primary"
        onClick={() => onPageChange("next")}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
