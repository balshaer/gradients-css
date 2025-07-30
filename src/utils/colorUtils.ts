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

  // Get simplified color names (just basic colors like "Red", "Blue", etc.)
  getSimplifiedColors: (gradients: any[]) => {
    const colorMap = new Set<string>();

    gradients.forEach((gradient) => {
      if (gradient.colorsname && Array.isArray(gradient.colorsname)) {
        gradient.colorsname.forEach((color: string) => {
          const lowerColor = color.toLowerCase();

          // Map complex color names to simple ones
          if (lowerColor.includes("red")) colorMap.add("Red");
          else if (lowerColor.includes("pink")) colorMap.add("Pink");
          else if (lowerColor.includes("orange")) colorMap.add("Orange");
          else if (lowerColor.includes("yellow")) colorMap.add("Yellow");
          else if (lowerColor.includes("green")) colorMap.add("Green");
          else if (lowerColor.includes("blue")) colorMap.add("Blue");
          else if (lowerColor.includes("purple") || lowerColor.includes("violet")) colorMap.add("Purple");
          else if (lowerColor.includes("brown") || lowerColor.includes("beige")) colorMap.add("Brown");
          else if (lowerColor.includes("black")) colorMap.add("Black");
          else if (lowerColor.includes("white")) colorMap.add("White");
          else if (lowerColor.includes("gray") || lowerColor.includes("grey")) colorMap.add("Gray");
          else if (lowerColor.includes("teal")) colorMap.add("Teal");
          else if (lowerColor.includes("cyan")) colorMap.add("Cyan");
        });
      }
    });

    return Array.from(colorMap).sort();
  },

  // Get simplified color categories for filtering
  getSimplifiedColorCategories: (colors: string[]) => {
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
      "🩵 Teal": [],
      "🩵 Cyan": [],
    };

    colors.forEach((color) => {
      switch (color) {
        case "Red": categories["🔴 Red"].push(color); break;
        case "Pink": categories["🩷 Pink"].push(color); break;
        case "Orange": categories["🟠 Orange"].push(color); break;
        case "Yellow": categories["🟡 Yellow"].push(color); break;
        case "Green": categories["🟢 Green"].push(color); break;
        case "Blue": categories["🔵 Blue"].push(color); break;
        case "Purple": categories["🟣 Purple"].push(color); break;
        case "Brown": categories["🟤 Brown"].push(color); break;
        case "Black": categories["⚫ Black"].push(color); break;
        case "White": categories["⚪ White"].push(color); break;
        case "Gray": categories["🔘 Gray"].push(color); break;
        case "Teal": categories["🩵 Teal"].push(color); break;
        case "Cyan": categories["🩵 Cyan"].push(color); break;
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
};
