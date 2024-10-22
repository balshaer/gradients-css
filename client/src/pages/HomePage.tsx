import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import gradients from "@/data/gradients.json";
import GradientGrid from "@/components/layouts/GradientGrid";
import Pagination from "@/components/layouts/Pagination";
import { cn } from "@/lib/utils";
import Footer from "@/components/layouts/Footer";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";

export default function GradientGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");
  const [background, setBackground] = useState("");
  const gradientsPerPage = 9;

  useEffect(() => {
    const storedFavorites = localStorage.getItem("gradientFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gradientFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const filteredGradients = gradients.filter(
    (gradient) =>
      gradient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "all" ||
        (filter === "favorites" && favorites.includes(gradient.name))),
  );

  const currentGradients = filteredGradients.slice(
    (currentPage - 1) * gradientsPerPage,
    currentPage * gradientsPerPage,
  );

  const totalPages = Math.ceil(filteredGradients.length / gradientsPerPage);

  const toggleFavorite = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name],
    );
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  return (
    <TooltipProvider>
      <div className="container" style={{ background }}>
        <div className="mx-auto max-w-6xl space-y-8 pt-12">
          <a href="https://github.com/balshaer/gradients-css" target="_blank">
            <div className="flex w-full items-center justify-center">
              <div
                className={cn(
                  "group rounded-full border border-black/5 bg-[#ffffff61] text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-[white] dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>✨ Contribute to The Project</span>
                  <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </div>
            </div>
          </a>
          <motion.h1
            className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Collection of modern, <br />
            <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
              CSS gradients
            </span>
          </motion.h1>

          <p className="m-auto mt-6 max-w-2xl pb-8 text-center text-lg leading-6 text-gray-600 dark:text-gray-200">
            Ready-to-use, simply copy and paste into your next project. All
            gradients crafted with CSS and Tailwind CSS for easy integration.
          </p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full" id="input">
              <Input
                placeholder="Search by gradient name"
                className="hover:border-brand-500-secondary invalid:border-error-500 invalid:focus:border-error-500 peer block h-full w-full appearance-none overflow-hidden overflow-ellipsis text-nowrap rounded-md border border-input border-slate-200 bg-background bg-white px-3 py-2 pr-[48px] text-sm text-slate-900 focus:border-none focus:border-transparent focus:outline focus:outline-2 focus:outline-slate-200 focus:ring-0"
                id="floating_outlined"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label
                className="peer-invalid:text-error-500 focus:invalid:text-error-500 data-[disabled]:bg-gray-50-background- absolute start-1 top-2 z-10 origin-[0] -translate-y-[1.2rem] scale-75 transform bg-white px-2 text-[14px] leading-[150%] text-primary duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-z-10 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:z-10 peer-focus:-translate-y-[1.2rem] peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                htmlFor="floating_outlined"
              >
                Search...
              </label>

              <SearchIcon className="absolute bottom-0 right-2 top-0 m-auto h-5 w-5 text-gray-600" />
            </div>

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gradients</SelectItem>
                <SelectItem value="favorites">Favorites</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <GradientGrid
            gradients={currentGradients}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setBackground={setBackground}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {/* <ResetBackground setBackground={setBackground} /> */}
        </div>

        <Footer />
      </div>
    </TooltipProvider>
  );
}
