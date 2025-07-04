export const colorUtils = {
  hexToRGB: (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  },

  rgbToHSL: (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
          break;
        case g:
          h = ((b - r) / d + 2) * 60;
          break;
        case b:
          h = ((r - g) / d + 4) * 60;
          break;
      }
    }
    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  },

  // Extract unique color names from gradients data
  getUniqueColors: (gradients: any[]) => {
    const colorSet = new Set<string>();

    gradients.forEach((gradient) => {
      if (gradient.colorsname && Array.isArray(gradient.colorsname)) {
        gradient.colorsname.forEach((color: string) => {
          if (color && typeof color === "string") {
            colorSet.add(color.toLowerCase().trim());
          }
        });
      }
    });

    return Array.from(colorSet).sort();
  },

  // Get basic color categories for professional filtering
  getColorCategories: (colors: string[]) => {
    const categories: { [key: string]: string[] } = {
      "🔴 Red": [],
      "🩷 Pink": [],
      "🟠 Orange": [],
      "🟡 Yellow": [],
      "🟢 Green": [],
      "🔵 Blue": [],
      "🟣 Purple": [],
      "🟤 Brown": [],
      "⚫ Black": [],
      "⚪ White": [],
      "🔘 Gray": [],
      "🎨 Other": [],
    };

    colors.forEach((color) => {
      const lowerColor = color.toLowerCase();

      if (lowerColor.includes("red")) {
        categories["🔴 Red"].push(color);
      } else if (lowerColor.includes("pink")) {
        categories["🩷 Pink"].push(color);
      } else if (
        lowerColor.includes("orange") ||
        lowerColor.includes("peach")
      ) {
        categories["🟠 Orange"].push(color);
      } else if (lowerColor.includes("yellow")) {
        categories["🟡 Yellow"].push(color);
      } else if (
        lowerColor.includes("green") ||
        lowerColor.includes("olive") ||
        lowerColor.includes("teal") ||
        lowerColor.includes("cyan")
      ) {
        categories["🟢 Green"].push(color);
      } else if (lowerColor.includes("blue") || lowerColor.includes("indigo")) {
        categories["🔵 Blue"].push(color);
      } else if (
        lowerColor.includes("purple") ||
        lowerColor.includes("violet") ||
        lowerColor.includes("magenta")
      ) {
        categories["🟣 Purple"].push(color);
      } else if (lowerColor.includes("brown") || lowerColor.includes("beige")) {
        categories["🟤 Brown"].push(color);
      } else if (lowerColor.includes("black")) {
        categories["⚫ Black"].push(color);
      } else if (lowerColor.includes("white")) {
        categories["⚪ White"].push(color);
      } else if (lowerColor.includes("gray") || lowerColor.includes("grey")) {
        categories["🔘 Gray"].push(color);
      } else {
        categories["🎨 Other"].push(color);
      }
    });

    // Remove empty categories
    Object.keys(categories).forEach((key) => {
      if (categories[key].length === 0) {
        delete categories[key];
      }
    });

    return categories;
  },

  // Get basic colors only (most common ones for professional filtering)
  getBasicColors: (gradients: any[]) => {
    const allColors = colorUtils.getUniqueColors(gradients);
    const basicColorKeywords = [
      "red",
      "pink",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple",
      "brown",
      "black",
      "white",
      "gray",
      "grey",
      "teal",
      "cyan",
    ];

    return allColors.filter((color) => {
      const lowerColor = color.toLowerCase();
      return basicColorKeywords.some((keyword) => lowerColor.includes(keyword));
    });
  },

  // Get simplified color categories with only basic colors
  getBasicColorCategories: (colors: string[]) => {
    const basicColors = colors.filter((color) => {
      const lowerColor = color.toLowerCase();
      const basicKeywords = [
        "red",
        "pink",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "brown",
        "black",
        "white",
        "gray",
        "grey",
        "teal",
        "cyan",
      ];
      return basicKeywords.some((keyword) => lowerColor.includes(keyword));
    });

    return colorUtils.getColorCategories(basicColors);
  },
};
