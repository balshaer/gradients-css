import { useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColorFilterProps {
  availableColors: string[];
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
}

export function ColorFilter({
  availableColors,
  selectedColors,
  onColorChange,
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

  // Map color name to a React Icon style
  const getColorIcon = (color: string) => {
    const lowerColor = color.toLowerCase();
    let colorValue = "#cbd5e1"; // default grey (tailwind slate-400)
    if (lowerColor.includes("red")) colorValue = "#ef4444";
    else if (lowerColor.includes("pink")) colorValue = "#ec4899";
    else if (lowerColor.includes("orange") || lowerColor.includes("peach")) colorValue = "#f97316";
    else if (lowerColor.includes("yellow")) colorValue = "#eab308";
    else if (lowerColor.includes("green") || lowerColor.includes("olive")) colorValue = "#22c55e";
    else if (lowerColor.includes("teal") || lowerColor.includes("cyan")) colorValue = "#14b8a6";
    else if (lowerColor.includes("blue") || lowerColor.includes("indigo")) colorValue = "#3b82f6";
    else if (lowerColor.includes("purple") || lowerColor.includes("violet") || lowerColor.includes("magenta")) colorValue = "#a21caf";
    else if (lowerColor.includes("brown") || lowerColor.includes("beige")) colorValue = "#b45309";
    else if (lowerColor.includes("gray") || lowerColor.includes("grey")) colorValue = "#6b7280";
    else if (lowerColor.includes("black")) colorValue = "#000";
    else if (lowerColor.includes("white")) colorValue = "#fff";
    // For white, use --border as border color
    return (
      <FaCircle 
        style={{
          color: colorValue,
          border: lowerColor === "white" ? "1px solid var(--border)" : undefined,
          borderRadius: "50%", // Ensures circle stays circle with border
          fontSize: "1.1rem",
        }}
      />
    );
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
        onSelect={e => {
          e.preventDefault();
          handleColorToggle(color);
        }}
      >
        <div className="flex items-center gap-2">
          {getColorIcon(color)}
          <span className="capitalize">{color}</span>
        </div>
        {isSelected && <FiCheck className="h-4 w-4 text-primary" />}
      </DropdownMenuItem>
    );
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
                  {selectedColors.slice(0, 3).map(color => (
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
            <FiChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-96 w-64 overflow-y-auto">
          <div className="flex items-center justify-between border-[var(--border)] border-b p-2">
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
          {availableColors.map(renderColorItem)}
        </DropdownMenuContent>
      </DropdownMenu>


    </div>
  );
}
