import { useState } from "react";
import { colorUtils } from "../utils/colorUtils";

export const useColorFormat = () => {
  const [selectedColorFormat, setSelectedColorFormat] = useState("HEX");
  const [gradientType, setGradientType] = useState<"background" | "text">(
    "background",
  );

  const updateColorFormat = (format: string) => {
    setSelectedColorFormat(format);
  };

  const getColorInFormat = (color: string) => {
    switch (selectedColorFormat) {
      case "RGB": {
        const { r, g, b } = colorUtils.hexToRGB(color);
        return `rgb(${r}, ${g}, ${b})`;
      }
      case "HSL": {
        const { r, g, b } = colorUtils.hexToRGB(color);
        const { h, s, l } = colorUtils.rgbToHSL(r, g, b);
        return `hsl(${h}, ${s}%, ${l}%)`;
      }
      default:
        return color.toUpperCase();
    }
  };

  return {
    selectedColorFormat,
    setSelectedColorFormat: updateColorFormat,
    getColorInFormat,
    gradientType,
    setGradientType,
  };
};
