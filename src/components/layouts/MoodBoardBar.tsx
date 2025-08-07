import { MoodBoardThemeKey, MoodBoardThemes } from "@/types/types";

interface MoodBoardBarProps {
  isMoodBoard: boolean;
  currentTheme: MoodBoardThemeKey | null;
  moodBoardThemes: MoodBoardThemes;
  moodBoardGradientsCount: number;
  onViewAll: () => void;
  onThemePick: (theme?: MoodBoardThemeKey) => void;
}

export const MoodBoardBar: React.FC<MoodBoardBarProps> = ({
  isMoodBoard,
  currentTheme,
  moodBoardThemes,
  moodBoardGradientsCount,
  onViewAll,
  onThemePick
}) => {
  if (!isMoodBoard) return null;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500"></div>
          <div>
            <h3 className="font-medium text-foreground">
              {currentTheme
                ? moodBoardThemes[currentTheme].name
                : "Mixed Mood Board"}
            </h3>
            <p className="text-sm text-foreground/60">
              {currentTheme
                ? moodBoardThemes[currentTheme].description
                : `${moodBoardGradientsCount} curated gradients from various themes`}
            </p>
          </div>
        </div>
        <button onClick={onViewAll}
          className="text-primary hover:text-primary/80 underline">
          View all gradients
        </button>
      </div>
      {/* Theme selector */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onThemePick()}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            !currentTheme
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Mixed
        </button>
        {Object.entries(moodBoardThemes).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => onThemePick(key as MoodBoardThemeKey)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              currentTheme === key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};
