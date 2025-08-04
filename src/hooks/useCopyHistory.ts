import { useState, useEffect } from "react";

interface CopyHistoryItem {
  name: string;
  colors: string[];
  timestamp: number;
  copyType: string; // 'css', 'tailwind', etc.
}

export function useCopyHistory() {
  const [copyHistory, setCopyHistory] = useState<CopyHistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("gradientCopyHistory");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Filter out items older than 30 days
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const filtered = parsed.filter((item: CopyHistoryItem) => item.timestamp > thirtyDaysAgo);
        setCopyHistory(filtered);
        
        // Save back the filtered list if anything was removed
        if (filtered.length !== parsed.length) {
          localStorage.setItem("gradientCopyHistory", JSON.stringify(filtered));
        }
      } catch (error) {
        console.error("Failed to parse copy history:", error);
        localStorage.removeItem("gradientCopyHistory");
      }
    }
  }, []);

  const addToCopyHistory = (name: string, colors: string[], copyType: string) => {
    setCopyHistory((prev) => {
      // Remove any existing entry with the same name and copyType
      const filtered = prev.filter(item => !(item.name === name && item.copyType === copyType));
      
      // Add new entry at the beginning
      const newItem: CopyHistoryItem = {
        name,
        colors,
        timestamp: Date.now(),
        copyType
      };
      
      const newHistory = [newItem, ...filtered].slice(0, 50); // Keep only last 50 items
      
      localStorage.setItem("gradientCopyHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearCopyHistory = () => {
    setCopyHistory([]);
    localStorage.removeItem("gradientCopyHistory");
  };

  const getRecentCopies = (limit: number = 10) => {
    return copyHistory
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  };

  const getCopyCount = () => copyHistory.length;

  return {
    copyHistory,
    addToCopyHistory,
    clearCopyHistory,
    getRecentCopies,
    getCopyCount
  };
}