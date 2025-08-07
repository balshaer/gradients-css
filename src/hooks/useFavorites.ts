import { useEffect, useState } from "react";

export function useFavorites() {
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
