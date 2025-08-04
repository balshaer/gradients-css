/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { SearchIcon, Plus } from "lucide-react";
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
import Footer from "@/components/layouts/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ColorFilter } from "@/components/controls/ColorFilter";
import { CopyHistorySection } from "@/components/sections/CopyHistorySection";
import { GradientCreator } from "@/components/sections/GradientCreator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FloatingSurpriseButton } from "@/components/layouts/FloatingSurpriseButton";
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
const GradientGallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebouncedValue(searchTerm, 250);

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [background, setBackground] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const gradientsPerLoad = 12;

  const { gradients, isLoading, error } = useGradients();
  const { favorites, toggleFavorite } = useFavorites();

  // Get available colors for filtering (cached for performance)
  const availableColors = useMemo(() => {
    return colorUtils.getSimplifiedColors(gradients);
  }, [gradients]);

  // Cache favorites set for faster lookups
  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  // Cache lowercase selected colors for better performance
  const selectedColorsLower = useMemo(() => 
    selectedColors.map(color => color.toLowerCase()), 
    [selectedColors]
  );



  // Optimized color matching map for better performance
  const colorMatches = useMemo(() => ({
    red: ['red'],
    pink: ['pink'],
    orange: ['orange'],
    yellow: ['yellow'],
    green: ['green'],
    blue: ['blue'],
    purple: ['purple', 'violet'],
    brown: ['brown', 'beige'],
    black: ['black'],
    white: ['white'],
    gray: ['gray', 'grey'],
    teal: ['teal'],
    cyan: ['cyan']
  }), []);

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
            (color ?? "").toLowerCase().includes(debouncedLower)
          );
          if (colorMatch) {
            // Found in colors, skip checking keywords
          } else {
            const keywordMatch = keywords.some((kwList) =>
              (kwList ?? []).some((kw) =>
                (kw ?? "").toLowerCase().includes(debouncedLower)
              )
            );
            if (!keywordMatch) return false;
          }
        }
      }

      // Color match (optimized with cached lowercase and map lookup)
      if (hasColorFilter) {
        const matchesColors = selectedColorsLower.some((lowerSelectedColor) => {
          const searchTerms = colorMatches[lowerSelectedColor] ?? [lowerSelectedColor];
          
          return colorsname.some((gradientColor) => {
            const lowerGradientColor = (gradientColor ?? "").toLowerCase();
            return searchTerms.some(term => lowerGradientColor.includes(term));
          });
        });
        if (!matchesColors) return false;
      }

      return true;
    });

    // Then, sort the filtered gradients
    return colorUtils.sortGradients(filtered, sortBy, favorites);
  }, [debouncedSearch, gradients, favorites, filter, selectedColors, sortBy, colorMatches, favoritesSet, selectedColorsLower]);

  const currentGradients = useMemo(() => {
    // Pre-filter valid gradients for better performance
    const validGradients = filteredGradients.filter(
      (gradient): gradient is { name: string; colors: string[] } =>
        gradient.name !== undefined &&
        gradient.colors !== undefined &&
        gradient.name.length > 0 &&
        gradient.colors.length > 0
    );
    
    return validGradients.slice(0, displayedCount);
  }, [filteredGradients, displayedCount]);

  const hasMore = currentGradients.length < filteredGradients.length;

  // --- Infinite Scroll Logic ---
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedCount(prev => prev + gradientsPerLoad);
      setIsLoadingMore(false);
    }, 300);
  }, [isLoadingMore, hasMore, gradientsPerLoad]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [hasMore, isLoadingMore, loadMore]);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayedCount(gradientsPerLoad);
  }, [debouncedSearch, filter, selectedColors, sortBy, gradientsPerLoad]);

  const handleRandomGradient = () => {
    if (filteredGradients.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * filteredGradients.length);
    const randomGradient = filteredGradients[randomIndex];
    
    // Clear search and filters to show all gradients
    setSearchTerm("");
    setFilter("all");
    setSelectedColors([]);
    
    // Reset display count to show the random gradient
    setDisplayedCount(gradientsPerLoad);
  };

  const handleGradientFromHistory = (gradientName: string) => {
    // Clear filters and search for the specific gradient
    setSearchTerm(gradientName);
    setFilter("all");
    setSelectedColors([]);
    setDisplayedCount(gradientsPerLoad);
  };

  const handleSaveGradient = (newGradient: { name: string; colors: string[] }) => {
    // Note: In a real app, this would save to a backend or extend the local data
    // For now, we'll just close the creator and show a success message
    setIsCreatorOpen(false);
    
    // Optionally, you could add the gradient to local storage for user-created gradients
    const userGradients = JSON.parse(localStorage.getItem("userGradients") || "[]");
    userGradients.push({
      ...newGradient,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isUserCreated: true
    });
    localStorage.setItem("userGradients", JSON.stringify(userGradients));
  };

  // --- Render ---
  return (
    <TooltipProvider>
      <div className="relative container" style={{ background }}>
        <div className="space-y-2 mx-auto pt-12 max-w-6xl">
          <HeroSection />

          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              
              <div className="relative transition-all duration-300 group" id="input">
                <Input
                  placeholder="Search by color name or keyword..."
                  className="peer block bg-input focus:shadow-none px-4 py-3 pr-[52px] border invalid:border-error-500 invalid:focus:border-error-500 border-border hover:border-brand-500-secondary focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-lg outline-none focus:outline-none w-full h-full overflow-ellipsis overflow-hidden text-foreground text-sm text-nowrap appearance-none transition-all duration-300 group-hover:shadow-lg"
                  id="floating_outlined"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <SearchIcon className="top-0 right-3 bottom-0 absolute m-auto w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors duration-300" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                <div className="sm:order-1">
                  <ColorFilter
                    availableColors={availableColors}
                    selectedColors={selectedColors}
                    onColorChange={(colors) => {
                      setSelectedColors(colors);
                    }}
                  />
                </div>

                <div className="sm:order-2">
                  <Select
                    value={filter}
                    onValueChange={(value) => {
                      setFilter(value);
                    }}
                  >
                    <SelectTrigger className="border-border hover:border-primary/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none w-full h-11 rounded-lg transition-all duration-300 nofocus nohover">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent className="border-border rounded-lg shadow-xl backdrop-blur-sm nofocus nohover">
                      <SelectItem value="all">All Gradients</SelectItem>
                      <SelectItem value="favorites">Favorites</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="sm:order-3">
                  <Select
                    value={sortBy}
                    onValueChange={(value) => {
                      setSortBy(value);
                    }}
                  >
                    <SelectTrigger className="border-border hover:border-primary/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none w-full h-11 rounded-lg transition-all duration-300 nofocus nohover">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="border-border rounded-lg shadow-xl backdrop-blur-sm nofocus nohover">
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="brightness">Brightness</SelectItem>
                      <SelectItem value="hue">Color Hue</SelectItem>
                      <SelectItem value="favorites">Favorites First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="sm:order-4 sm:col-span-2 lg:col-span-2 flex flex-wrap gap-2">
                  <CopyHistorySection onGradientSelect={handleGradientFromHistory} />

                  <Dialog open={isCreatorOpen} onOpenChange={setIsCreatorOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="default"
                        className="flex items-center justify-center gap-2 whitespace-nowrap h-11 hover:scale-105 transition-all duration-300 hover:shadow-lg flex-1 sm:flex-none"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Create Gradient</span>
                        <span className="sm:hidden">Create</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <GradientCreator onSave={handleSaveGradient} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
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
            <div className="flex flex-col justify-center items-center py-12 text-center">
              <p className="mb-4 text-red-500">Error loading gradients: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-primary-foreground"
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

          {/* Infinite Scroll Trigger */}
          {hasMore && (
            <div ref={loadMoreRef} className="flex justify-center py-8">
              {isLoadingMore ? (
                <div className="flex items-center gap-2 text-foreground/60">
                  <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  <span>Loading more gradients...</span>
                </div>
              ) : (
                <div className="text-foreground/40 text-sm">
                  Scroll to load more
                </div>
              )}
            </div>
          )}
          
          {!hasMore && currentGradients.length > 0 && (
            <div className="text-center py-8 text-foreground/60">
              <p>You've reached the end! 🎉</p>
              <p className="text-sm mt-1">Showing all {currentGradients.length} gradients</p>
            </div>
          )}
        </div>
        <Footer />
        
        <FloatingSurpriseButton 
          onClick={handleRandomGradient}
          disabled={filteredGradients.length === 0}
        />
      </div>
    </TooltipProvider>
  );
};

export default GradientGallery;
