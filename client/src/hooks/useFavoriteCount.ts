import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useFavoriteCount = (gradientName: string) => {
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    let count = parseInt(Cookies.get(`favorite_${gradientName}`) || "0", 10);

    if (count === 0) {
      count = Math.floor(Math.random() * (22 - 5 + 1)) + 5;
    }

    setFavoriteCount(count);
  }, [gradientName]);

  const incrementFavoriteCount = () => {
    const newCount = favoriteCount + 1;
    Cookies.set(`favorite_${gradientName}`, newCount.toString(), {
      expires: 365,
    });
    setFavoriteCount(newCount);
  };

  const decrementFavoriteCount = () => {
    const newCount = Math.max(favoriteCount - 1, 0);
    Cookies.set(`favorite_${gradientName}`, newCount.toString(), {
      expires: 365,
    });
    setFavoriteCount(newCount);
  };

  return { favoriteCount, incrementFavoriteCount, decrementFavoriteCount };
};
