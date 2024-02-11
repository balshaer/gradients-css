import React, { useEffect, useState } from "react";
import { HiCheck, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { VscCopy } from "react-icons/vsc";
import GradientFetcher from "./GradientFetcher"; // Import the GradientFetcher component
import { SiTruenas } from "react-icons/si";

function Gradients() {
  const [gradients, setGradients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleGradients, setVisibleGradients] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [showIcons, setShowIcons] = useState({});

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCopy = (index) => {
    const gradient = visibleGradients[index];
    const cssGradient = `background: linear-gradient(to right, ${gradient.colors.join(
      ", "
    )});`;
    navigator.clipboard.writeText(cssGradient);
    setShowIcons((prevState) => ({
      ...prevState,
      [index]: false,
    }));
    setTimeout(() => {
      setShowIcons((prevState) => ({
        ...prevState,
        [index]: true,
      }));
    }, 3000);
  };

  useEffect(() => {
    const totalPages = Math.ceil(gradients.length / 12);
    setTotalPages(totalPages);

    const startPage = Math.max(1, currentPage - 3);
    setStartPage(startPage);

    const endPage = Math.min(startPage + 6, totalPages);
    setEndPage(endPage);

    const visibleGradients = gradients.slice(
      (currentPage - 1) * 12,
      currentPage * 12
    );
    setVisibleGradients(visibleGradients);

    // Initialize showIcons state for each gradient card
    setShowIcons(Object.fromEntries(visibleGradients.map((_, i) => [i, true])));
  }, [currentPage, gradients]);

  return (
    <div>
      <GradientFetcher setGradients={setGradients} />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        {visibleGradients.map((gradient, index) => (
          <div
            key={index}
            className="h-72 rounded-lg text-sm flex flex-col justify-start items-center bg-black p-4 gap-2"
          >
            <header className="w-full h-10 font-semibold p-2 flex justify-between items-center ">
              <span className="text-[var(--color-headline)]">
                {gradient.name}
              </span>
              <span
                className="cursor-pointer text-lg text-[var(--color-headline)]"
                onClick={() => handleCopy(index)}
              >
                {showIcons[index] ? <VscCopy /> : <HiCheck />}
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
              ></div>
            </div>

            <footer className="w-full h-16 text-[var(--color-paragraph)] gap-2 font-semibold p-2 flex justify-between flex-col items-start">
              <div className="flex gap-2">
                {gradient.colors.map((color, i) => (
                  <span
                    key={i}
                    className="rounded-full h-5 w-5"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>

              <div className="flex gap-1 flex-wrap  h-20 max-h-none min-h-20 w-full">
                {gradient.colors.map((color, i) => (
                  <span key={i}>{color}</span>
                ))}
              </div>
            </footer>
          </div>
        ))}
      </section>

      <div className="flex justify-center my-24">
        <button
          className="mr-2 px-2 py-1 bg-[#eceef0] rounded"
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
              className={`mx-1 px-2 py-1 ${
                currentPage === startPage + i
                  ? "bg-[#0072f5] text-[#edf0f1]"
                  : "bg-[#eceef0]"
              } rounded`}
              onClick={() => handlePageChange(startPage + i)}
            >
              {startPage + i}
            </button>
          )
        )}
        <button
          className="ml-2 px-2 py-1 bg-[#eceef0] rounded cursor-pointer"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Gradients;
