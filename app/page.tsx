"use client";

import Gradients from "@/components/layouts/gradients/Gradients";
import GradientsFetcher from "@/components/layouts/gradients/GradientFetcher";
import Header from "@/components/layouts/header/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [gradients, setGradients] = useState([]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <ScrollArea className="h-full min-h-[100vh] w-full   p-4 max-w-7xl m-auto">
        <Header />

        <GradientsFetcher
          currentPage={currentPage}
          pageSize={pageSize}
          setGradients={setGradients as any}
        />
        <Gradients
          gradients={gradients}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onPageChange={onPageChange}
        />
      </ScrollArea>
    </main>
  );
}
