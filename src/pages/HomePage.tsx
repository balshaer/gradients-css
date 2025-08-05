/* eslint-disable react-hooks/exhaustive-deps */
import { ColorFilter } from "@/components/controls/ColorFilter";
import { FloatingSurpriseButton } from "@/components/layouts/FloatingSurpriseButton";
import Footer from "@/components/layouts/Footer";
import { CopyHistorySection } from "@/components/sections/CopyHistorySection";
import { GradientCreator } from "@/components/sections/GradientCreator";
import GradientGrid from "@/components/sections/GradientGrid";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandKitBuilder } from "@/components/tools/BrandKitBuilder";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import gradientsData from "@/data/gradients.json";
import { colorUtils } from "@/utils/colorUtils";
import { Plus, SearchIcon, Palette } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [background, setBackground] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [isBrandKitBuilderOpen, setIsBrandKitBuilderOpen] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // State for mood board
  const [isMoodBoard, setIsMoodBoard] = useState(false);
  const [moodBoardGradients, setMoodBoardGradients] = useState<Array<{ name: string; colors: string[] }>>([]);

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
            return searchTerms.some((term: string) =>
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

  const currentGradients = useMemo(() => {
    // If in mood board mode, return mood board gradients
    if (isMoodBoard && moodBoardGradients.length > 0) {
      return moodBoardGradients;
    }
    
    // Otherwise, use normal filtering logic
    const validGradients = filteredGradients.filter(
      (gradient): gradient is { name: string; colors: string[] } =>
        gradient.name !== undefined &&
        gradient.colors !== undefined &&
        gradient.name.length > 0 &&
        gradient.colors.length > 0,
    );

    return validGradients.slice(0, displayedCount);
  }, [filteredGradients, displayedCount, isMoodBoard, moodBoardGradients]);

  const hasMore = !isMoodBoard && currentGradients.length < filteredGradients.length;

  // --- Infinite Scroll Logic ---
  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedCount((prev) => prev + gradientsPerLoad);
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
        rootMargin: "100px",
        threshold: 0.1,
      },
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
    // Exit mood board mode when filters are applied
    if (debouncedSearch || filter !== "all" || selectedColors.length > 0) {
      setIsMoodBoard(false);
      setMoodBoardGradients([]);
    }
  }, [debouncedSearch, filter, selectedColors, sortBy, gradientsPerLoad]);

  // Advanced mood board themes
  const moodBoardThemes = {
    sunset: {
      name: "Golden Hour",
      description: "Warm, energetic gradients perfect for sunsets and energy",
      colors: ['red', 'orange', 'yellow', 'pink', 'coral'],
      keywords: ['sunset', 'sunrise', 'warm', 'fire', 'gold'],
      count: 8
    },
    ocean: {
      name: "Ocean Breeze",
      description: "Cool, calming gradients inspired by water and sky",
      colors: ['blue', 'teal', 'cyan', 'turquoise', 'aqua'],
      keywords: ['ocean', 'sea', 'water', 'sky', 'wave'],
      count: 8
    },
    nature: {
      name: "Forest Path",
      description: "Natural gradients with greens and earth tones",
      colors: ['green', 'lime', 'forest', 'olive', 'sage'],
      keywords: ['nature', 'forest', 'leaf', 'tree', 'earth'],
      count: 8
    },
    mystic: {
      name: "Mystic Dreams",
      description: "Mysterious purples and deep cosmic colors",
      colors: ['purple', 'violet', 'indigo', 'magenta', 'lavender'],
      keywords: ['mystic', 'cosmic', 'dream', 'magic', 'space'],
      count: 8
    },
    minimal: {
      name: "Clean Slate",
      description: "Elegant neutrals and monochromatic gradients",
      colors: ['gray', 'grey', 'black', 'white', 'silver'],
      keywords: ['minimal', 'clean', 'simple', 'elegant', 'mono'],
      count: 8
    },
    vibrant: {
      name: "Electric Vibes",
      description: "Bold, high-energy gradients that pop",
      colors: ['neon', 'bright', 'electric', 'vivid'],
      keywords: ['electric', 'neon', 'bright', 'vivid', 'bold'],
      count: 8
    }
  };

  const [currentMoodTheme, setCurrentMoodTheme] = useState<keyof typeof moodBoardThemes | null>(null);

  const generateMoodBoard = (theme?: keyof typeof moodBoardThemes) => {
    if (gradients.length === 0) return;

    // Clear search and filters to show mood board
    setSearchTerm("");
    setFilter("all");
    setSelectedColors([]);

    const availableGradients = gradients.filter(g => g.name && g.colors && g.colors.length > 0);

    let selectedGradients: typeof availableGradients = [];

    if (theme && moodBoardThemes[theme]) {
      const themeConfig = moodBoardThemes[theme];
      setCurrentMoodTheme(theme);

      // Filter gradients based on theme colors and keywords
      const themeGradients = availableGradients.filter(g => {
        const hasMatchingColor = g.colorsname?.some(color => 
          themeConfig.colors.some(themeColor => 
            color?.toLowerCase().includes(themeColor.toLowerCase())
          )
        );
        
        const hasMatchingKeyword = g.keywords?.some(keywordList =>
          keywordList?.some(keyword =>
            themeConfig.keywords.some(themeKeyword =>
              keyword?.toLowerCase().includes(themeKeyword.toLowerCase())
            )
          )
        ) || g.name?.toLowerCase().split(' ').some(namePart =>
          themeConfig.keywords.some(themeKeyword =>
            namePart.includes(themeKeyword.toLowerCase())
          )
        );

        return hasMatchingColor || hasMatchingKeyword;
      });

      // If we have enough theme gradients, use them; otherwise supplement with random ones
      if (themeGradients.length >= themeConfig.count) {
        selectedGradients = themeGradients
          .sort(() => Math.random() - 0.5)
          .slice(0, themeConfig.count);
      } else {
        // Use all theme gradients and fill with random ones
        const remainingCount = themeConfig.count - themeGradients.length;
        const randomGradients = availableGradients
          .filter(g => !themeGradients.includes(g))
          .sort(() => Math.random() - 0.5)
          .slice(0, remainingCount);
        
        selectedGradients = [...themeGradients, ...randomGradients]
          .sort(() => Math.random() - 0.5);
      }
    } else {
      // Generate a balanced mixed mood board
      setCurrentMoodTheme(null);
      
      const categoryGradients: { [key: string]: typeof availableGradients } = {};
      
      // Categorize gradients
      Object.entries(moodBoardThemes).forEach(([key, config]) => {
        categoryGradients[key] = availableGradients.filter(g => {
          const hasMatchingColor = g.colorsname?.some(color => 
            config.colors.some(themeColor => 
              color?.toLowerCase().includes(themeColor.toLowerCase())
            )
          );
          return hasMatchingColor;
        });
      });

      // Select 2 gradients from each category
      Object.values(categoryGradients).forEach(categoryList => {
        if (categoryList.length > 0) {
          const selected = categoryList
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          selectedGradients.push(...selected);
        }
      });

      // Shuffle final selection
      selectedGradients = selectedGradients
        .sort(() => Math.random() - 0.5)
        .slice(0, 12);
    }

    const finalSelection = selectedGradients
      .filter((g): g is { name: string; colors: string[] } => 
        g.name !== undefined && g.colors !== undefined
      )
      .map(g => ({ name: g.name, colors: g.colors }));

    setMoodBoardGradients(finalSelection);
    setIsMoodBoard(true);
    setDisplayedCount(finalSelection.length);
    
    // Scroll to top to show the mood board
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleGradientFromHistory = (gradientName: string) => {
    // Clear filters and search for the specific gradient
    setSearchTerm(gradientName);
    setFilter("all");
    setSelectedColors([]);
    setDisplayedCount(gradientsPerLoad);
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

          <div className="flex flex-col gap-8">
            {/* Search Section */}
            <div className="space-y-4">
              <div className="relative">
                <div className="group relative transition-all duration-300" id="input">
                  <Input
                    placeholder="Search by color name or keyword..."
                    className="h-12 w-full rounded-lg border border-border bg-background px-4 pr-12 text-foreground transition-all duration-300 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <SearchIcon className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
                    <SelectTrigger className="h-11 w-full rounded-lg border-border transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-border shadow-xl">
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
                    <SelectTrigger className="h-11 w-full rounded-lg border-border transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border-border shadow-xl">
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="brightness">Brightness</SelectItem>
                      <SelectItem value="hue">Color Hue</SelectItem>
                      <SelectItem value="favorites">Favorites First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 sm:order-4 sm:col-span-2 lg:col-span-2">
                  <CopyHistorySection
                    onGradientSelect={handleGradientFromHistory}
                  />

                  <Dialog open={isCreatorOpen} onOpenChange={setIsCreatorOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        className="flex h-11 items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Create Gradient</span>
                        <span className="sm:hidden">Create</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                      <GradientCreator onSave={handleSaveGradient} />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    onClick={() => setIsBrandKitBuilderOpen(true)}
                    className="flex h-11 items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Palette className="h-4 w-4" />
                    <span className="hidden sm:inline">Brand Kit</span>
                    <span className="sm:hidden">Brand</span>
                  </Button>
                </div>
              </div>
            </div>

            {isMoodBoard ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500"></div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {currentMoodTheme ? moodBoardThemes[currentMoodTheme].name : "Mixed Mood Board"}
                      </h3>
                      <p className="text-sm text-foreground/60">
                        {currentMoodTheme 
                          ? moodBoardThemes[currentMoodTheme].description
                          : `${moodBoardGradients.length} curated gradients from various themes`
                        }
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsMoodBoard(false);
                      setMoodBoardGradients([]);
                      setCurrentMoodTheme(null);
                      setDisplayedCount(gradientsPerLoad);
                    }}
                    className="text-primary hover:text-primary/80 underline"
                  >
                    View all gradients
                  </button>
                </div>
                
                {/* Theme selector */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => generateMoodBoard()}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      !currentMoodTheme 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    Mixed
                  </button>
                  {Object.entries(moodBoardThemes).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => generateMoodBoard(key as keyof typeof moodBoardThemes)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        currentMoodTheme === key 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (selectedColors.length > 0 || searchTerm || filter !== "all") && (
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

          {/* Infinite Scroll Trigger */}
          {hasMore && (
            <div ref={loadMoreRef} className="flex justify-center py-8">
              {isLoadingMore ? (
                <div className="text-foreground/60 flex items-center gap-2">
                  <div className="border-primary/30 h-5 w-5 animate-spin rounded-full border-2 border-t-primary"></div>
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
            <div className="text-foreground/60 py-8 text-center">
              <p>You've reached the end! 🎉</p>
              <p className="mt-1 text-sm">
                Showing all {currentGradients.length} gradients
              </p>
            </div>
          )}
        </div>
        <Footer />

        <FloatingSurpriseButton
          onClick={() => {
            if (isMoodBoard) {
              // Cycle through themes if already in mood board mode
              const themeKeys = Object.keys(moodBoardThemes) as Array<keyof typeof moodBoardThemes>;
              const currentIndex = currentMoodTheme ? themeKeys.indexOf(currentMoodTheme) : -1;
              const nextIndex = (currentIndex + 1) % (themeKeys.length + 1); // +1 for mixed mode
              
              if (nextIndex === themeKeys.length) {
                generateMoodBoard(); // Mixed mode
              } else {
                generateMoodBoard(themeKeys[nextIndex]);
              }
            } else {
              // First click - generate mixed mood board
              generateMoodBoard();
            }
          }}
          disabled={gradients.length === 0}
          isActive={isMoodBoard}
          tooltip={
            isMoodBoard 
              ? `${currentMoodTheme ? moodBoardThemes[currentMoodTheme].name : 'Mixed'} - Click for next theme`
              : 'Generate Mood Board'
          }
        />

        {isBrandKitBuilderOpen && (
          <BrandKitBuilder
            gradients={isMoodBoard ? moodBoardGradients : currentGradients}
            onClose={() => setIsBrandKitBuilderOpen(false)}
          />
        )}
      </div>
    </TooltipProvider>
  );
};

export default GradientGallery;
