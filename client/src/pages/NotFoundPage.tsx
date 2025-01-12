"use client";
import { motion } from "framer-motion";

import { RetroGrid } from "@/components/ui/RetroGrid";

export function NotFoundPage() {
  return (
    <div className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-[var(--background)] md:shadow-xl">
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
        className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent"
      >
        404 Not Found
      </motion.span>

      <RetroGrid />
    </div>
  );
}
