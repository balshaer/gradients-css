export interface GradientCardProps {
  gradient: { name: string; colors: string[] };
  isFavorite: boolean;
  onFavoriteToggle: (name: string) => void;
  favoriteCount: number;
  name: string;
  colorsname: string[];
  keywords: string[][];
}


