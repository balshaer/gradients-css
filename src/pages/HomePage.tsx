/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { SearchIcon } from "lucide-react";
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
import Footer from "@/components/layouts/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ColorFilter } from "@/components/controls/ColorFilter";
import { colorUtils } from "@/utils/colorUtils";
import gradientsData from "@/data/gradients.json";

// --- Types ---
interface Gradient {
  name?: string;                // allow possibly undefined!
  colors?: string[];
  colorsname?: string[];
  keywords?: string[][];
}

// --- Custom Hooks ---
function useGradients() {
  const [gradients, setGradients] = useState<Gradient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGradients = () => {
      setIsLoading(true);
      setError(null);
      try {
        // Use the imported local data
        setGradients(gradientsData as Gradient[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load gradients");
      } finally {
        setIsLoading(false);
      }
    };
    loadGradients();
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
const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebouncedValue(searchTerm, 250);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [background, setBackground] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const gradientsPerPage = 9;

  const { gradients, isLoading, error } = useGradients();
  const { favorites, toggleFavorite } = useFavorites();

  // Get available colors for filtering (simplified)
  const availableColors = useMemo(() => {
    return colorUtils.getSimplifiedColors(gradients);
  }, [gradients]);



  // --- Filtering Logic ---
  const filteredGradients = useMemo(() => {
    if (!gradients.length) return [];
    const debouncedLower = debouncedSearch.toLowerCase();

    return gradients.filter((gradient) => {
      // Defensive fallback for missing data!
      const name = gradient.name ?? "";
      const colorsname = gradient.colorsname ?? [];
      const keywords = gradient.keywords ?? [];

      // Search match
      const matchesSearch =
        !debouncedSearch ||
        name.toLowerCase().includes(debouncedLower) ||
        colorsname.some((color) =>
          (color ?? "").toLowerCase().includes(debouncedLower)
        ) ||
        keywords.some((kwList) =>
          (kwList ?? []).some((kw) =>
            (kw ?? "").toLowerCase().includes(debouncedLower)
          )
        );

      // Favorites match
      const matchesFavorites =
        filter === "all" ||
        (filter === "favorites" && favorites.includes(name));

      // Color match
      const matchesColors =
        selectedColors.length === 0 ||
        selectedColors.some((selectedColor) =>
          colorsname.some((gradientColor) => {
            const lowerGradientColor = (gradientColor ?? "").toLowerCase();
            const lowerSelectedColor = (selectedColor ?? "").toLowerCase();

            if (lowerSelectedColor === "red" && lowerGradientColor.includes("red")) return true;
            if (lowerSelectedColor === "pink" && lowerGradientColor.includes("pink")) return true;
            if (lowerSelectedColor === "orange" && lowerGradientColor.includes("orange")) return true;
            if (lowerSelectedColor === "yellow" && lowerGradientColor.includes("yellow")) return true;
            if (lowerSelectedColor === "green" && lowerGradientColor.includes("green")) return true;
            if (lowerSelectedColor === "blue" && lowerGradientColor.includes("blue")) return true;
            if (lowerSelectedColor === "purple" && (lowerGradientColor.includes("purple") || lowerGradientColor.includes("violet"))) return true;
            if (lowerSelectedColor === "brown" && (lowerGradientColor.includes("brown") || lowerGradientColor.includes("beige"))) return true;
            if (lowerSelectedColor === "black" && lowerGradientColor.includes("black")) return true;
            if (lowerSelectedColor === "white" && lowerGradientColor.includes("white")) return true;
            if (lowerSelectedColor === "gray" && (lowerGradientColor.includes("gray") || lowerGradientColor.includes("grey"))) return true;
            if (lowerSelectedColor === "teal" && lowerGradientColor.includes("teal")) return true;
            if (lowerSelectedColor === "cyan" && lowerGradientColor.includes("cyan")) return true;

            return false;
          })
        );
      return matchesSearch && matchesFavorites && matchesColors;
    });
  }, [debouncedSearch, gradients, favorites, filter, selectedColors]);

  const totalPages = Math.ceil(filteredGradients.length / gradientsPerPage);
  const currentGradients = useMemo(() => {
    const start = (currentPage - 1) * gradientsPerPage;
    return filteredGradients
      .slice(start, start + gradientsPerPage)
      .filter((gradient): gradient is { name: string; colors: string[] } =>
        gradient.name !== undefined &&
        gradient.colors !== undefined &&
        gradient.name.length > 0 &&
        gradient.colors.length > 0
      );
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
          <HeroSection />

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


              <div className=" ">

                  <ColorFilter
                availableColors={availableColors}
                selectedColors={selectedColors}
                onColorChange={(colors) => {
                  setSelectedColors(colors);
                  setCurrentPage(1);
                }}
              />
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

export default HomePage;
