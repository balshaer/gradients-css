import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "../ui/slider";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { toast } from "@/hooks/use-toast";
import { MagicCard } from "../ui/MagicCard";
import { useTheme } from "next-themes";

interface GradientCardProps {
  gradient: { name: string; colors: string[] };
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export default function GradientCard({
  gradient,
  isFavorite,
  onFavoriteToggle,
}: GradientCardProps) {
  const [activeTab, setActiveTab] = useState("tailwind");
  const [angle, setAngle] = useState(90);
  const [copiedStates, setCopiedStates] = useState({
    tailwind: false,
    css: false,
    colors: false,
    route: false,
  });

  const copyToClipboard = (text: string, key: keyof typeof copiedStates) => {
    navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    toast({
      title: "🎉Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopiedStates({
        tailwind: false,
        css: false,
        colors: false,
        route: false,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [copiedStates]);

  const tailwindCode = `bg-gradient-to-r from-[${gradient.colors[0]}] to-[${
    gradient.colors[gradient.colors.length - 1]
  }]`;

  const cssCode = `background-image: linear-gradient(${angle}deg, ${gradient.colors.join(", ")});`;
  const { theme } = useTheme();

  return (
    <MagicCard
      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      className="overflow-hidden transition-all duration-300"
    >
      <header className="w-full">
        <motion.div
          className="h-48 w-full"
          style={{
            backgroundImage: `linear-gradient(${angle}deg, ${gradient.colors.join(", ")})`,
          }}
          transition={{ duration: 0.3 }}
        />
      </header>
      <footer className="flex flex-col items-start space-y-4 p-4">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-600">
            {gradient.name}
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className="rounded-full p-2 transition-colors hover:bg-gray-100"
                onClick={onFavoriteToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isFavorite ? "fill-current text-red-500" : "text-gray-400",
                  )}
                />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex w-full flex-wrap gap-2">
          {gradient.colors.map((color, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <motion.div
                  className="hoverd h-6 w-6 cursor-pointer rounded-full"
                  style={{ backgroundColor: color }}
                  onClick={() => copyToClipboard(color, "colors")}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to copy: {color}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="flex w-full items-center space-x-2">
          <Slider
            value={[angle]}
            onValueChange={(value) => setAngle(value[0])}
            max={360}
            step={1}
            className="flex-grow"
          />
          <span className="text-sm font-medium text-gray-600">{angle}°</span>f
          <FaArrowRotateLeft
            className="flex h-full cursor-pointer items-center justify-center text-gray-600"
            onClick={() => setAngle(90)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 text-gray-600">
            <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>
          <TabsContent value="tailwind" className="mt-2">
            <div className="relative flex">
              <pre className="w-full overflow-hidden rounded-md bg-gray-100 p-2 text-xs text-gray-500">
                {tailwindCode}
              </pre>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full bg-gray-100 p-0"
                onClick={() => copyToClipboard(tailwindCode, "tailwind")}
              >
                <AnimatePresence>
                  {copiedStates.tailwind ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="h-4 w-4 text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Copy className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="css" className="mt-2">
            <div className="relative">
              <pre className="w-full overflow-hidden rounded-md bg-gray-100 p-2 text-xs text-gray-500">
                {cssCode}
              </pre>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full bg-gray-100 p-0"
                onClick={() => copyToClipboard(cssCode, "css")}
              >
                <AnimatePresence>
                  {copiedStates.css ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="h-4 w-4 text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Copy className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </footer>
    </MagicCard>
  );
}
