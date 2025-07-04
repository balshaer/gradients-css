/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
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
import HeroUsers from "@/components/layouts/HeroUsers";
import SplashCursor from "@/components/ui/SplashCursor";

const GradientGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
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

  const filteredGradients = useMemo(() => {
    return gradients.filter((gradient: any) => {
      // Search filter (by color name or keyword)
      const matchesSearch =
        !searchTerm ||
        gradient.colorsname.some((color: string) =>
          color.toLowerCase().includes(searchTerm.toLowerCase()),
        ) ||
        gradient.keywords.some((keywordList: string[]) =>
          keywordList.some((keyword: string) =>
            keyword.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        );

      // Favorites filter
      const matchesFavorites: boolean =
        filter === "all" ||
        (filter === "favorites" && favorites.includes(gradient?.name || ""));

      // Color filter
      const matchesColors =
        selectedColors.length === 0 ||
        selectedColors.some((selectedColor) =>
          gradient?.colorsname?.some((gradientColor) =>
            gradientColor.toLowerCase().includes(selectedColor.toLowerCase()),
          ),
        );

      return matchesSearch && matchesFavorites && matchesColors;
    });
  }, [searchTerm, gradients, favorites, filter, selectedColors]);

  const currentGradients = useMemo(() => {
    const startIndex = (currentPage - 1) * gradientsPerPage;
    return filteredGradients.slice(startIndex, startIndex + gradientsPerPage);
  }, [currentPage, filteredGradients, gradientsPerPage]);

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
      <div className="container relative" style={{ background }}>
        <div className="mx-auto max-w-6xl space-y-2 pt-12">
          <header className="relative mx-auto max-w-6xl space-y-2 pt-12">
            <a
              href="https://github.com/balshaer/gradients-css"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex w-full items-center justify-center">
                <div
                  className={cn(
                    "group rounded-full border border-border bg-card text-base text-[var(--muted)] transition-all ease-in hover:cursor-pointer dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                  )}
                >
                  <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 text-primary transition ease-out hover:duration-300 max-md:text-xs">
                    <span>✨ Contribute to The Project</span>
                    <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedShinyText>
                </div>
              </div>
            </a>
            <h1 className="pt-6 text-center text-3xl font-medium text-primary dark:text-gray-50 sm:text-6xl">
              Collection of modern,
              <span className="relative ps-1">
                Gradients
                <img
                  className="absolute bottom-[-10px] left-0 right-0"
                  src="https://uploads-ssl.webflow.com/618ce467f09b34ebf2fdf6be/62779adeac94b82ea2fe08ec_Underline%202.svg" // Consider optimizing or using a local asset
                  alt=""
                />
              </span>
            </h1>

            <p className="m-auto mt-[-120px] max-w-2xl py-0 pb-0 pt-3 text-center text-lg leading-6 text-muted-foreground dark:text-gray-200">
              Ready-to-use, simply copy and paste into your next project. All
              gradients crafted with CSS and Tailwind CSS for easy integration.
            </p>

            <div className="flex w-full items-center justify-center pb-6">
              <HeroUsers />
            </div>
          </header>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative w-full" id="input">
                <Input
                  placeholder="Search by color name or keyword..."
                  className="hover:border-brand-500-secondary invalid:border-error-500 invalid:focus:border-error-500 text-placeholder peer block h-full w-full appearance-none overflow-hidden overflow-ellipsis text-nowrap rounded-md border border-border bg-input px-3 py-2 pr-[48px] text-sm outline-none focus:border-none focus:shadow-none focus:outline-none"
                  id="floating_outlined"
                  type="text"
                  value={searchTerm} // Consider adding debounce to this input
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <SearchIcon className="absolute bottom-0 right-2 top-0 m-auto h-5 w-5 text-primary" />
              </div>

              <Select
                value={filter}
                onValueChange={(value) => {
                  setFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="nofocus nohover w-full border-none outline-none sm:w-[180px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="nofocus nohover border-none outline-none">
                  <SelectItem value="all">All Gradients</SelectItem>
                  <SelectItem value="favorites">Favorites</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Color Filter */}
            {/* <div className="w-full sm:w-80">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Filter by Colors
                </label>
                <ColorFilter
                  availableColors={availableColors}
                  selectedColors={selectedColors}
                  onColorChange={handleColorChange}
                  colorCategories={colorCategories}
                />
              </div>
            </div> */}

            {/* Results count */}
            {(selectedColors.length > 0 || searchTerm || filter !== "all") && (
              <div className="text-sm text-muted-foreground">
                Showing {filteredGradients.length} gradient
                {filteredGradients.length !== 1 ? "s" : ""}
                {selectedColors.length > 0 && (
                  <span> with colors: {selectedColors.join(", ")}</span>
                )}
              </div>
            )}
          </div>

          <GradientGrid
            gradients={currentGradients as any}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setBackground={setBackground}
            isLoading={false}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default GradientGallery;
