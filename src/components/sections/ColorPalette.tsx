import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { colorUtils } from "@/utils/colorUtils";
import { ChevronDown, ChevronUp, Copy, Palette } from "lucide-react";
import { useState } from "react";

interface ColorPaletteProps {
  colors: string[];
  gradientName: string;
}

export function ColorPalette({ colors }: ColorPaletteProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComplementary, setShowComplementary] = useState(false);

  const palette = colorUtils.extractPalette(colors);
  const complementaryColors = colorUtils.generateComplementaryColors(colors);

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied!",
      description: `${color} copied to clipboard`,
    });
  };

  const copyAllColors = (format: "hex" | "rgb" | "hsl") => {
    const colorString = palette
      .map((p) => {
        switch (format) {
          case "rgb":
            return p.rgb;
          case "hsl":
            return p.hsl;
          default:
            return p.hex;
        }
      })
      .join(", ");

    navigator.clipboard.writeText(colorString);
    toast({
      title: "All colors copied!",
      description: `${palette.length} colors copied as ${format.toUpperCase()}`,
    });
  };

  if (!colors || colors.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="flex items-center gap-2 font-medium text-sm text-white">
          <Palette className="w-4 h-4" />
          Color Palette ({palette.length} colors)
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0 w-6 h-6 text-white hover:bg-white/10 flex items-center justify-center"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Basic palette - always visible */}
      <div className="flex flex-wrap gap-1">
        {palette.map((colorInfo, index) => (
          <div
            key={index}
            className="group relative cursor-pointer"
            onClick={() => copyColor(colorInfo.hex)}
            title={`${colorInfo.hex} - Click to copy`}
          >
            <div
              className="border border-white/20 rounded w-8 h-8 group-hover:scale-110 transition-transform"
              style={{ backgroundColor: colorInfo.hex }}
            />
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Copy className="drop-shadow-lg w-3 h-3 text-white" />
            </div>
          </div>
        ))}
      </div>

      {isExpanded && (
        <div className="space-y-4 pt-2 border-t border-border/50">
          {/* Detailed color information */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyAllColors("hex")}
                className="h-7 text-xs text-white border-white/30 hover:bg-white/10"
              >
                Copy HEX
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyAllColors("rgb")}
                className="h-7 text-xs text-white border-white/30 hover:bg-white/10"
              >
                Copy RGB
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyAllColors("hsl")}
                className="h-7 text-xs text-white border-white/30 hover:bg-white/10"
              >
                Copy HSL
              </Button>
            </div>

            {/* Color details */}
            <div className="space-y-2">
              {palette.map((colorInfo, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-muted/30 hover:bg-muted/50 p-2 rounded transition-colors"
                >
                  <div
                    className="flex-shrink-0 border border-white/20 rounded w-6 h-6"
                    style={{ backgroundColor: colorInfo.hex }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-4 text-white/90 text-xs">
                      <button
                        onClick={() => copyColor(colorInfo.hex)}
                        className="font-mono hover:text-white transition-colors"
                        title="Click to copy HEX"
                      >
                        {colorInfo.hex}
                      </button>
                      <button
                        onClick={() => copyColor(colorInfo.rgb)}
                        className="font-mono hover:text-white transition-colors"
                        title="Click to copy RGB"
                      >
                        {colorInfo.rgb}
                      </button>
                      <button
                        onClick={() => copyColor(colorInfo.hsl)}
                        className="font-mono hover:text-white transition-colors"
                        title="Click to copy HSL"
                      >
                        {colorInfo.hsl}
                      </button>
                    </div>
                    <div className="mt-1 text-white/70 text-xs">
                      <span>H: {colorInfo.hue}°</span>
                      <span className="ml-3">S: {colorInfo.saturation}%</span>
                      <span className="ml-3">L: {colorInfo.lightness}%</span>
                      <span className="ml-3">
                        {colorInfo.isLight ? "Light" : "Dark"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Complementary colors */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h5 className="font-medium text-white/90 text-xs">
                  Complementary Colors
                </h5>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComplementary(!showComplementary)}
                  className="p-1 h-5 text-xs text-white/90 hover:text-white hover:bg-white/10"
                >
                  {showComplementary ? "Hide" : "Show"}
                </Button>
              </div>

              {showComplementary && (
                <div className="flex flex-wrap gap-1">
                  {complementaryColors.map((color, index) => (
                    <div
                      key={index}
                      className="group relative cursor-pointer"
                      onClick={() => copyColor(color)}
                      title={`${color} - Click to copy`}
                    >
                      <div
                        className="border border-white/20 rounded w-6 h-6 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                      <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="drop-shadow-lg w-2 h-2 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
