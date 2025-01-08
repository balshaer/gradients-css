"use client";

import { RetroGrid } from "@/components/ui/RetroGrid";

export function NotFoundPage() {
  return (
    <div className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-[var(--background)] md:shadow-xl">
      <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
       404 Not Found
      </span>

      <RetroGrid />
    </div>
  );
}
