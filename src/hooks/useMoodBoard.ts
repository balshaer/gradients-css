import { useState } from "react";
import { MoodBoardThemes, MoodBoardThemeKey, Gradient } from "../types";

export function useMoodBoard(gradients: Gradient[], moodBoardThemes: MoodBoardThemes) {
  const [isMoodBoard, setIsMoodBoard] = useState(false);
  const [moodBoardGradients, setMoodBoardGradients] = useState<Array<{ name: string; colors: string[] }>>([]);
  const [currentMoodTheme, setCurrentMoodTheme] = useState<MoodBoardThemeKey | null>(null);

  const generateMoodBoard = (theme?: MoodBoardThemeKey) => {
    // ...logic as previously shown...
  };

  return {
    isMoodBoard,
    setIsMoodBoard,
    moodBoardGradients,
    generateMoodBoard,
    currentMoodTheme,
    setCurrentMoodTheme,
  }
}
