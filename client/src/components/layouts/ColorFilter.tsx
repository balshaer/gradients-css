import { useState } from "react";
import { Check, ChevronDown, X, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ColorFilterProps {
  availableColors: string[];
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
  colorCategories?: { [key: string]: string[] };
}

export function ColorFilter({
  availableColors,
  selectedColors,
  onColorChange,
  colorCategories,
}: ColorFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorToggle = (color: string) => {
    const newSelectedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    onColorChange(newSelectedColors);
  };

  const handleClearAll = () => {
    onColorChange([]);
  };

  const handleSelectAll = () => {
    onColorChange(availableColors);
  };

  // Get color icon and styling based on color name
  const getColorIcon = (color: string) => {
    const lowerColor = color.toLowerCase();

    if (lowerColor.includes("red")) {
      return <Circle className="h-4 w-4 fill-red-500 text-red-500" />;
    } else if (lowerColor.includes("pink")) {
      return <Circle className="h-4 w-4 fill-pink-500 text-pink-500" />;
    } else if (lowerColor.includes("orange") || lowerColor.includes("peach")) {
      return <Circle className="h-4 w-4 fill-orange-500 text-orange-500" />;
    } else if (lowerColor.includes("yellow")) {
      return <Circle className="h-4 w-4 fill-yellow-500 text-yellow-500" />;
    } else if (lowerColor.includes("green") || lowerColor.includes("olive")) {
      return <Circle className="h-4 w-4 fill-green-500 text-green-500" />;
    } else if (lowerColor.includes("teal") || lowerColor.includes("cyan")) {
      return <Circle className="h-4 w-4 fill-teal-500 text-teal-500" />;
    } else if (lowerColor.includes("blue") || lowerColor.includes("indigo")) {
      return <Circle className="h-4 w-4 fill-blue-500 text-blue-500" />;
    } else if (
      lowerColor.includes("purple") ||
      lowerColor.includes("violet") ||
      lowerColor.includes("magenta")
    ) {
      return <Circle className="h-4 w-4 fill-purple-500 text-purple-500" />;
    } else if (lowerColor.includes("brown") || lowerColor.includes("beige")) {
      return <Circle className="h-4 w-4 fill-amber-700 text-amber-700" />;
    } else if (lowerColor.includes("gray") || lowerColor.includes("grey")) {
      return <Circle className="h-4 w-4 fill-gray-500 text-gray-500" />;
    } else if (lowerColor.includes("black")) {
      return <Circle className="h-4 w-4 fill-black text-black" />;
    } else if (lowerColor.includes("white")) {
      return (
        <Circle className="h-4 w-4 border border-gray-300 fill-white text-white" />
      );
    } else {
      return <Circle className="h-4 w-4 fill-slate-400 text-slate-400" />;
    }
  };

  const renderColorItem = (color: string) => {
    const isSelected = selectedColors.includes(color);
    return (
      <DropdownMenuItem
        key={color}
        className={cn(
          "flex cursor-pointer items-center justify-between gap-2 px-3 py-2",
          isSelected && "bg-accent",
        )}
        onSelect={(e) => {
          e.preventDefault();
          handleColorToggle(color);
        }}
      >
        <div className="flex items-center gap-2">
          {getColorIcon(color)}
          <span className="capitalize">{color}</span>
        </div>
        {isSelected && <Check className="h-4 w-4 text-primary" />}
      </DropdownMenuItem>
    );
  };

  const renderColorsByCategory = () => {
    if (!colorCategories) {
      return availableColors.map(renderColorItem);
    }

    return Object.entries(colorCategories).map(([category, colors]) => (
      <div key={category}>
        <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground">
          {category}
        </DropdownMenuLabel>
        {colors.map(renderColorItem)}
        {Object.keys(colorCategories).indexOf(category) <
          Object.keys(colorCategories).length - 1 && (
          <DropdownMenuSeparator className="my-1" />
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between text-left font-normal hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              {selectedColors.length > 0 && selectedColors.length <= 3 && (
                <div className="flex gap-1">
                  {selectedColors.slice(0, 3).map((color) => (
                    <div key={color} className="scale-75">
                      {getColorIcon(color)}
                    </div>
                  ))}
                </div>
              )}
              <span>
                {selectedColors.length === 0
                  ? `Select colors (${availableColors.length})`
                  : `${selectedColors.length} selected`}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-96 w-64 overflow-y-auto">
          <div className="flex items-center justify-between border-b p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSelectAll}
              className="h-auto p-2 text-xs hover:bg-accent"
            >
              Select All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="h-auto p-2 text-xs hover:bg-accent"
            >
              Clear All
            </Button>
          </div>
          {renderColorsByCategory()}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Selected colors badges */}
      {selectedColors.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedColors.map((color) => (
            <Badge
              key={color}
              variant="secondary"
              className="flex cursor-pointer items-center gap-1 text-xs capitalize hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => handleColorToggle(color)}
            >
              <div className="scale-75">{getColorIcon(color)}</div>
              {color}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
