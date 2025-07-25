// Simple test to verify color filtering functionality
import { colorUtils } from "../utils/colorUtils";

// Mock gradient data for testing
const mockGradients = [
  {
    name: "Red Sunset",
    colors: ["#FF0000", "#FF6B6B"],
    colorsname: ["bright red", "light red"],
    keywords: [
      ["red", "vibrant"],
      ["red", "soft"],
    ],
  },
  {
    name: "Ocean Blue",
    colors: ["#0066CC", "#87CEEB"],
    colorsname: ["dark blue", "light blue"],
    keywords: [
      ["blue", "deep"],
      ["blue", "sky"],
    ],
  },
  {
    name: "Forest Green",
    colors: ["#228B22", "#90EE90"],
    colorsname: ["dark green", "light green"],
    keywords: [
      ["green", "nature"],
      ["green", "fresh"],
    ],
  },
  {
    name: "Purple Dream",
    colors: ["#800080", "#DDA0DD"],
    colorsname: ["dark purple", "light purple"],
    keywords: [
      ["purple", "royal"],
      ["purple", "soft"],
    ],
  },
];

// Test color extraction
console.log("Testing color extraction...");
const uniqueColors = colorUtils.getUniqueColors(mockGradients);
console.log("Unique colors:", uniqueColors);

// Test basic colors filtering
console.log("\nTesting basic colors filtering...");
const basicColors = colorUtils.getBasicColors(mockGradients);
console.log("Basic colors:", basicColors);

// Test color categorization
console.log("\nTesting color categorization...");
const categories = colorUtils.getBasicColorCategories(basicColors);
console.log("Color categories:", categories);

// Test filtering logic simulation
console.log("\nTesting filtering logic...");
const selectedColors = ["red", "blue"];

const filteredGradients = mockGradients.filter((gradient) => {
  const matchesColors =
    selectedColors.length === 0 ||
    selectedColors.some((selectedColor) =>
      gradient.colorsname.some((gradientColor) =>
        gradientColor.toLowerCase().includes(selectedColor.toLowerCase()),
      ),
    );
  return matchesColors;
});

console.log("Selected colors:", selectedColors);
console.log(
  "Filtered gradients:",
  filteredGradients.map((g) => g.name),
);

export { mockGradients };
