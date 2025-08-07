import { useMemo } from "react";
import { Gradient } from "../types";

export function useFilteredGradients(
  gradients: Gradient[],
  {
    searchTerm,
    filter,
    favorites,
    selectedColors,
    sortBy,
    colorMatches,
  }: {
    searchTerm: string;
    filter: string;
    favorites: string[];
    selectedColors: string[];
    sortBy: string;
    colorMatches: Record<string, string[]>;
  }
) {
  const selectedColorsLower = useMemo(
    () => selectedColors.map((color) => color.toLowerCase()),
    [selectedColors]
  );
  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);
  const debouncedLower = searchTerm.toLowerCase();

  return useMemo(() => {
    if (!gradients.length) return [];
    if (filter === "favorites" && favorites.length === 0) return [];
    const hasSearch = Boolean(searchTerm);
    const hasColorFilter = selectedColors.length > 0;

    // Filtering...
    const filtered = gradients.filter((gradient) => {
      const name = gradient.name ?? "";
      const colorsname = gradient.colorsname ?? [];
      const keywords = gradient.keywords ?? [];

      if (filter === "favorites" && !favoritesSet.has(name)) return false;

      // Search...
      if (hasSearch) {
        const nameMatch = name.toLowerCase().includes(debouncedLower);
        if (!nameMatch) {
          const colorMatch = colorsname.some((color) =>
            (color ?? "").toLowerCase().includes(debouncedLower)
          );
          const keywordMatch = keywords.some((kwList) =>
            (kwList ?? []).some((kw) =>
              (kw ?? "").toLowerCase().includes(debouncedLower)
            )
          );
          if (!colorMatch && !keywordMatch) return false;
        }
      }

      if (hasColorFilter) {
        const matchesColors = selectedColorsLower.some((lowerSelectedColor) => {
          const searchTerms = colorMatches[lowerSelectedColor] ?? [
            lowerSelectedColor,
          ];
          return colorsname.some((gradientColor) => {
            const lowerGradientColor = (gradientColor ?? "").toLowerCase();
            return searchTerms.some((term) =>
              lowerGradientColor.includes(term)
            );
          });
        });
        if (!matchesColors) return false;
      }

      return true;
    });

    // Sorting (use your sort function)
    return filtered; // sort outside if desired
  }, [
    gradients,
    searchTerm,
    filter,
    favorites,
    selectedColors,
    colorMatches,
    favoritesSet,
    selectedColorsLower,
    debouncedLower,
  ]);
}
