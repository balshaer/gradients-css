"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCheck,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineZoomOut,
} from "react-icons/hi";
import { VscCopy } from "react-icons/vsc";
import GradientFetcher from "./GradientFetcher";
import SearchBar from "@/components/common/search_bar/SearchBar";
import AnimationComponent from "@/components/common/animation/AnimationComponent";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import CardLoading from "../loading/CardLoading";

interface Gradient {
  name: string;
  colors: string[];
}

interface GradientsProps {
  gradients: Gradient[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onPageChange: (page: number) => void;
}

const Gradients: React.FC<GradientsProps> = ({
  gradients: propGradients,
  currentPage,
  setCurrentPage,
  onPageChange,
}) => {
  const [visibleGradients, setVisibleGradients] = useState<Gradient[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(1);
  const [showIcons, setShowIcons] = useState<boolean[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [noGradientsFound, setNoGradientsFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handlePageChange = (page: number) => {
    setLoading(false);
    setCurrentPage(page);
  };

  const handleCopy = (index: number) => {
    toast.success("Copied");

    const gradient = visibleGradients[index];
    const cssGradient = `background: linear-gradient(to right, ${gradient.colors.join(
      ", "
    )});`;
    navigator.clipboard.writeText(cssGradient);
    setShowIcons((prevIcons) =>
      prevIcons.map((icon, idx) => (idx === index ? false : icon))
    );
    setTimeout(() => {
      setShowIcons((prevIcons) =>
        prevIcons.map((icon, idx) => (idx === index ? true : icon))
      );
    }, 3000);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filteredGradients = propGradients.filter((gradient) =>
      gradient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredGradients.length / 12);
    setTotalPages(totalPages);

    const startPage = Math.max(1, currentPage - 3);
    setStartPage(startPage);

    const endPage = Math.min(startPage + 6, totalPages);
    setEndPage(endPage);

    const visibleGradients = filteredGradients.slice(
      (currentPage - 1) * 12,
      currentPage * 12
    );
    setVisibleGradients(visibleGradients);

    setShowIcons(Array.from({ length: visibleGradients.length }, () => true));

    setNoGradientsFound(filteredGradients.length === 0);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currentPage, propGradients, searchQuery]);

  return (
    <div>
      <div className="w-full flex justify-center items-center py-10 pb-[120px]">
        <SearchBar onSearch={handleSearch} />
      </div>
      <AnimationComponent>
        <GradientFetcher setGradients={() => {}} />

        {loading ? (
          <CardLoading />
        ) : noGradientsFound ? (
          <div className="text-center text-white w-full flex items-center justify-center gap-2">
            <span>There is no gradient by this name.</span>
            <span>
              <HiOutlineZoomOut />
            </span>
          </div>
        ) : (
          <AnimatePresence>
            <motion.section
              className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8"
              initial="hidden"
              animate="visible"
            >
              {visibleGradients.map((gradient: Gradient, index: number) => (
                <motion.div
                  key={index}
                  className="h-72 outline outline-[3px] outline-[#787d82c7] rounded-3xl text-white text-sm flex flex-col justify-start items-center bg-black p-4 gap-2"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0, y: -50 }}
                >
                  <header className="w-full h-10 font-semibold p-2 flex justify-between items-center ">
                    <span className="text-[var(--color-headline)]">
                      {gradient.name}
                    </span>
                    <span
                      className="cursor-pointer text-lg text-[var(--color-headline)]"
                      onClick={() => handleCopy(index)}
                    >
                      {showIcons[index] ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <VscCopy />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy CSS</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <HiCheck />
                      )}
                    </span>
                  </header>
                  <div className="h-28">
                    <div
                      className="rounded-full h-28 w-28"
                      style={{
                        background: `linear-gradient(to right, ${gradient.colors.join(
                          ", "
                        )})`,
                      }}
                    />
                  </div>
                  <footer className="w-full h-16 text-white gap-2 font-semibold p-2 flex justify-between flex-col items-start">
                    <div className="flex gap-2">
                      {gradient.colors.map((color: string, i: number) => (
                        <span
                          key={i}
                          className="rounded-full h-5 w-5"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="flex gap-1 flex-wrap h-20 max-h-none min-h-20 w-full">
                      {gradient.colors.map((color: string, i: number) => (
                        <span key={i}>{color}</span>
                      ))}
                    </div>
                  </footer>
                </motion.div>
              ))}
            </motion.section>
          </AnimatePresence>
        )}

        <div className="flex justify-center my-24">
          <button
            className="mr-2 px-2 py-1 bg-[#000] text-white outline outline-[3px] outline-[#787d82c7] rounded-2xl hoverd hover:text-[#fff] hover:outline-[#fff] cursor-pointer"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <HiChevronLeft />
          </button>
          {Array.from(
            { length: totalPages > 0 ? endPage - startPage + 1 : 0 },
            (_, i) => (
              <button
                key={startPage + i}
                className={`mx-1 flex justify-center items-center w-8 h-8 bg-[#000] text-white ${
                  currentPage === startPage + i ? "bg-gray-700" : ""
                }`}
                onClick={() => handlePageChange(startPage + i)}
              >
                {startPage + i}
              </button>
            )
          )}
          <button
            className="ml-2 flex justify-center items-center w-8 h-8 bg-[#000] text-white outline outline-[3px] outline-[#787d82c7] rounded-3xl hoverd hover:text-[#fff] hover:outline-[#fff] cursor-pointer"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <HiChevronRight />
          </button>
        </div>
      </AnimationComponent>
    </div>
  );
};

export default Gradients;
