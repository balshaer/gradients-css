import { useCallback } from "react";
import { toast } from "@/hooks/use-toast";

export const useCustomToast = () => {
  const showToast = useCallback((title: string, description: string) => {
    toast({
      title,
      description,
    });
  }, []);

  return { showToast };
};
