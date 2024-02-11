"use client";

import { useState, useEffect } from "react";

export default function PageLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <div className="h-[100vh] w-[100vw] z-50 bg-[var(--color-background)] flex justify-center items-center flex-col fixed inset-0 m-auto">
      <div className="text-[var(--color-headline)] text-base font-semibold flex items-center justify-center gap-4 h-full w-full ">
        <div className=" pb-10 w-full flex items-center justify-center text-center flex-col">
          <p className="w-full ps-2 pb-4">Loading...</p>
          <div className="loader before:bg-[var(--color-button)] w-full"></div>
        </div>
      </div>
    </div>
  ) : null;
}
