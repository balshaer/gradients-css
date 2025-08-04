/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { SearchIcon, Shuffle, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { CopyHistorySection } from "@/components/sections/CopyHistorySection";
import { GradientCreator } from "@/components/sections/GradientCreator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { colorUtils } from "@/utils/colorUtils";
import gradientsData from "@/data/gradients.json";

// --- Types ---
interface Gradient {
  name?: string; // allow possibly undefined!
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
        setError(
          err instanceof Error ? err.message : "Failed to load gradients",
        );
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
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name],
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
  const [sortBy, setSortBy] = useState("name");
  const [background, setBackground] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  const gradientsPerPage = 9;

  const { gradients, isLoading, error } = useGradients();
  const { favorites, toggleFavorite } = useFavorites();

  // Get available colors for filtering (cached for performance)
  const availableColors = useMemo(() => {
    return colorUtils.getSimplifiedColors(gradients);
  }, [gradients]);

  // Cache favorites set for faster lookups
  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  // Cache lowercase selected colors for better performance
  const selectedColorsLower = useMemo(
    () => selectedColors.map((color) => color.toLowerCase()),
    [selectedColors],
  );

  // Optimized color matching map for better performance
  const colorMatches = useMemo(
    () => ({
      red: ["red"],
      pink: ["pink"],
      orange: ["orange"],
      yellow: ["yellow"],
      green: ["green"],
      blue: ["blue"],
      purple: ["purple", "violet"],
      brown: ["brown", "beige"],
      black: ["black"],
      white: ["white"],
      gray: ["gray", "grey"],
      teal: ["teal"],
      cyan: ["cyan"],
    }),
    [],
  );

  // --- Filtering and Sorting Logic ---
  const filteredGradients = useMemo(() => {
    if (!gradients.length) return [];

    // Early returns for performance
    if (filter === "favorites" && favorites.length === 0) return [];

    const debouncedLower = debouncedSearch.toLowerCase();
    const hasSearch = Boolean(debouncedSearch);
    const hasColorFilter = selectedColors.length > 0;

    // First, filter the gradients
    const filtered = gradients.filter((gradient) => {
      // Defensive fallback for missing data
      const name = gradient.name ?? "";
      const colorsname = gradient.colorsname ?? [];
      const keywords = gradient.keywords ?? [];

      // Favorites match (check first as it's fastest, using Set for O(1) lookup)
      if (filter === "favorites" && !favoritesSet.has(name)) return false;

      // Search match (optimized with early exit)
      if (hasSearch) {
        const nameMatch = name.toLowerCase().includes(debouncedLower);
        if (nameMatch) {
          // Found in name, skip checking colors and keywords
        } else {
          const colorMatch = colorsname.some((color) =>
            (color ?? "").toLowerCase().includes(debouncedLower),
          );
          if (colorMatch) {
            // Found in colors, skip checking keywords
          } else {
            const keywordMatch = keywords.some((kwList) =>
              (kwList ?? []).some((kw) =>
                (kw ?? "").toLowerCase().includes(debouncedLower),
              ),
            );
            if (!keywordMatch) return false;
          }
        }
      }

      // Color match (optimized with cached lowercase and map lookup)
      if (hasColorFilter) {
        const matchesColors = selectedColorsLower.some((lowerSelectedColor) => {
          const searchTerms = colorMatches[lowerSelectedColor] ?? [
            lowerSelectedColor,
          ];

          return colorsname.some((gradientColor) => {
            const lowerGradientColor = (gradientColor ?? "").toLowerCase();
            return searchTerms.some((term) =>
              lowerGradientColor.includes(term),
            );
          });
        });
        if (!matchesColors) return false;
      }

      return true;
    });

    // Then, sort the filtered gradients
    return colorUtils.sortGradients(filtered, sortBy, favorites);
  }, [
    debouncedSearch,
    gradients,
    favorites,
    filter,
    selectedColors,
    sortBy,
    colorMatches,
    favoritesSet,
    selectedColorsLower,
  ]);

  const totalPages = Math.ceil(filteredGradients.length / gradientsPerPage);
  const currentGradients = useMemo(() => {
    const start = (currentPage - 1) * gradientsPerPage;
    const end = start + gradientsPerPage;

    // Pre-filter valid gradients for better performance
    const validGradients = filteredGradients.filter(
      (gradient): gradient is { name: string; colors: string[] } =>
        gradient.name !== undefined &&
        gradient.colors !== undefined &&
        gradient.name.length > 0 &&
        gradient.colors.length > 0,
    );

    return validGradients.slice(start, end);
  }, [currentPage, filteredGradients, gradientsPerPage]);

  // --- Handlers ---
  const handlePageChange = (direction: "next" | "prev") => {
    setCurrentPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  const handleRandomGradient = () => {
    if (filteredGradients.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filteredGradients.length);
    const randomGradient = filteredGradients[randomIndex];

    // Clear search and filters to show all gradients
    setSearchTerm("");
    setFilter("all");
    setSelectedColors([]);

    // Calculate which page the random gradient would be on (use original gradients array)
    const randomGradientPosition = gradients.findIndex(
      (g) => g.name === randomGradient.name,
    );
    if (randomGradientPosition !== -1) {
      const targetPage =
        Math.floor(randomGradientPosition / gradientsPerPage) + 1;
      setCurrentPage(
        Math.max(
          1,
          Math.min(targetPage, Math.ceil(gradients.length / gradientsPerPage)),
        ),
      );
    } else {
      // Fallback: go to first page
      setCurrentPage(1);
    }
  };

  const handleGradientFromHistory = (gradientName: string) => {
    // Clear filters and search for the specific gradient
    setSearchTerm(gradientName);
    setFilter("all");
    setSelectedColors([]);
    setCurrentPage(1);
  };

  const handleSaveGradient = (newGradient: {
    name: string;
    colors: string[];
  }) => {
    // Note: In a real app, this would save to a backend or extend the local data
    // For now, we'll just close the creator and show a success message
    setIsCreatorOpen(false);

    // Optionally, you could add the gradient to local storage for user-created gradients
    const userGradients = JSON.parse(
      localStorage.getItem("userGradients") || "[]",
    );
    userGradients.push({
      ...newGradient,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isUserCreated: true,
    });
    localStorage.setItem("userGradients", JSON.stringify(userGradients));
  };

  // --- Render ---
  return (
    <TooltipProvider>
      <div className="container relative" style={{ background }}>
        <div className="mx-auto max-w-6xl space-y-2 pt-12">
          <HeroSection />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative w-full min-w-32" id="input">
                <Input
                  placeholder="Search by color name or keyword..."
                  className="invalid:border-error-500 invalid:focus:border-error-500 hover:border-brand-500-secondary text-placeholder peer block h-full w-full appearance-none overflow-hidden overflow-ellipsis text-nowrap rounded-md border border-border bg-input px-3 py-2 pr-[48px] text-sm outline-none focus:border-none focus:shadow-none focus:outline-none"
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

              <div className="flex w-full flex-col gap-2 md:flex-row">
                <ColorFilter
                  availableColors={availableColors}
                  selectedColors={selectedColors}
                  onColorChange={(colors) => {
                    setSelectedColors(colors);
                    setCurrentPage(1);
                  }}
                  className="w-full lg:w-32"
                />

                <Select
                  value={filter}
                  onValueChange={(value) => {
                    setFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="nofocus nohover w-full border-none outline-none lg:w-32">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent className="nofocus nohover border-none outline-none">
                    <SelectItem value="all">All Gradients</SelectItem>
                    <SelectItem value="favorites">Favorites</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    setSortBy(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="nofocus nohover w-full border-none outline-none lg:w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="nofocus nohover border-none outline-none">
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="brightness">Brightness</SelectItem>
                    <SelectItem value="hue">Color Hue</SelectItem>
                    <SelectItem value="favorites">Favorites First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleRandomGradient}
                variant="outline"
                className="flex items-center gap-2 whitespace-nowrap"
                disabled={filteredGradients.length === 0}
              >
                <Shuffle className="h-4 w-4" />
                Surprise Me
              </Button>

              <CopyHistorySection
                onGradientSelect={handleGradientFromHistory}
              />

              <Dialog open={isCreatorOpen} onOpenChange={setIsCreatorOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    <Plus className="h-4 w-4" />
                    Create Gradient
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                  <GradientCreator onSave={handleSaveGradient} />
                </DialogContent>
              </Dialog>
            </div>

            {(selectedColors.length > 0 || searchTerm || filter !== "all") && (
              <div className="text-foreground/70 text-sm">
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
              <p className="mb-4 text-red-500">
                Error loading gradients: {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="hover:bg-primary/90 rounded-md bg-primary px-4 py-2 text-primary-foreground"
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
