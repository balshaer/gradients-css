"use client";
import React, { useState } from "react";
import Gradients from "@/components/layouts/gradients/Gradients";
import GradientsFetcher from "@/components/layouts/gradients/GradientFetcher";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";

interface Gradient {
  id: number;
  name: string;
  colors: string[];
}

export default function Home(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [gradients, setGradients] = useState<Gradient[]>([]);

  const onPageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <main>
      <div className="h-full min-h-[100vh] w-full p-4 max-w-7xl m-auto">
        <Header />

        <GradientsFetcher setGradients={setGradients} />

        <Gradients
          gradients={gradients}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onPageChange={onPageChange}
        />

        <Footer />
      </div>
    </main>
  );
}
