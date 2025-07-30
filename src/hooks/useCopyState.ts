import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const useCopyState = () => {
  const [copiedStates, setCopiedStates] = useState({
    tailwind: false,
    css: false,
    sass: false,
    bootstrap: false,
    xml: false,
    svg: false,
    json: false,
    colors: false,
  });

  const copyToClipboard = (text: string, key: keyof typeof copiedStates) => {
    navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    toast({
      title: "Copied to clipboard ✅",
      description: `The ${key} code has been copied to your clipboard.`,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopiedStates({
        tailwind: false,
        css: false,
        sass: false,
        bootstrap: false,
        xml: false,
        svg: false,
        json: false,
        colors: false,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [copiedStates]);

  return { copiedStates, copyToClipboard };
};
