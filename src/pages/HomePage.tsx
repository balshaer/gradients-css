/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
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
import GradientGrid from "@/components/sections/GradientGrid";
import Pagination from "@/components/layouts/Pagination";
import { cn } from "@/lib/utils";
import Footer from "@/components/layouts/Footer";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import HeroUsers from "@/components/layouts/HeroUsers";

// --- Types ---
interface Gradient {
  name: string;
  colors: string[];
  colorsname: string[];
  keywords: string[][];
}

// --- Custom Hooks ---
function useGradients() {
  const [gradients, setGradients] = useState<Gradient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchGradients = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<Gradient[]>(
          "https://gist.githubusercontent.com/balshaer/69d1f26f366d2dcf2d58d6d644f0aff4/raw/6350bd8c935e9d9f937ec95cd250f819bfc57afc/data.json"
        );
        if (!cancelled) setGradients(response.data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to fetch gradients");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchGradients();
    return () => {
      cancelled = true;
    };
  }, []);

  return { gradients, isLoading, error };
}

function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("gradientFavorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("gradientFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  return { favorites, toggleFavorite };
}

// --- Debounce Hook ---
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

// --- Main Component ---
const GradientGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebouncedValue(searchTerm, 250);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [background, setBackground] = useState("");
  const selectedColors: string[] = []; // Placeholder for future color filter

  const gradientsPerPage = 9;

  const { gradients, isLoading, error } = useGradients();
  const { favorites, toggleFavorite } = useFavorites();

  // --- Filtering Logic ---
  const filteredGradients = useMemo(() => {
    if (!gradients.length) return [];
    return gradients.filter((gradient) => {
      const matchesSearch =
        !debouncedSearch ||
        gradient.colorsname.some((color) =>
          color.toLowerCase().includes(debouncedSearch.toLowerCase())
        ) ||
        gradient.keywords.some((kwList) =>
          kwList.some((kw) =>
            kw.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
        );
      const matchesFavorites =
        filter === "all" ||
        (filter === "favorites" && favorites.includes(gradient.name));
      const matchesColors =
        selectedColors.length === 0 ||
        selectedColors.some((selectedColor) =>
          gradient.colorsname.some((gradientColor) =>
            gradientColor.toLowerCase().includes(selectedColor.toLowerCase())
          )
        );
      return matchesSearch && matchesFavorites && matchesColors;
    });
  }, [debouncedSearch, gradients, favorites, filter, selectedColors]);

  const totalPages = Math.ceil(filteredGradients.length / gradientsPerPage);
  const currentGradients = useMemo(() => {
    const start = (currentPage - 1) * gradientsPerPage;
    return filteredGradients.slice(start, start + gradientsPerPage);
  }, [currentPage, filteredGradients, gradientsPerPage]);

  // --- Handlers ---
  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  // --- Render ---
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
                    "group rounded-full border border-border bg-card text-base text-[var(--muted)] transition-all ease-in hover:cursor-pointer dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
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
                  src="https://uploads-ssl.webflow.com/618ce467f09b34ebf2fdf6be/62779adeac94b82ea2fe08ec_Underline%202.svg"
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
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
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

          {error && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-red-500 mb-4">Error loading gradients: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Retry
              </button>
            </div>
          )}

          {!error && (
            <GradientGrid
              gradients={currentGradients}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              setBackground={setBackground}
              isLoading={isLoading}
            />
          )}

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
