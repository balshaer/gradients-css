import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("gradientFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (name: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(name)
        ? prev.filter((f) => f !== name)
        : [...prev, name];
      localStorage.setItem("gradientFavorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const getFavoriteCount = () => favorites.length;

  return { favorites, toggleFavorite, getFavoriteCount };
}
