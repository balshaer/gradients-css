import { useEffect, useState } from "react";
import gradientsData from "@/data/gradients.json";
import { Gradient } from "../types";

export function useGradients() {
  const [gradients, setGradients] = useState<Gradient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGradients = () => {
      setIsLoading(true);
      setError(null);
      try {
        setGradients(gradientsData as Gradient[]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load gradients"
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadGradients();
  }, []);

  return { gradients, isLoading, error };
}
