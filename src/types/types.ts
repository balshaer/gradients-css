export interface GradientCardProps {
  gradient: { name: string; colors: string[] };
  isFavorite: boolean;
  onFavoriteToggle: (name: string) => void;
}

export interface Gradient {
  name?: string;
  colors?: string[];
  colorsname?: string[];
  keywords?: string[][];
}

export type MoodBoardThemeKey = 'sunset' | 'ocean' | 'nature' | 'mystic' | 'minimal' | 'vibrant';

export interface MoodBoardTheme {
  name: string;
  description: string;
  colors: string[];
  keywords: string[];
  count: number;
}

export interface MoodBoardThemes {
  [key: string]: MoodBoardTheme;
}
