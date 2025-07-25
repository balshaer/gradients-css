import React from "react";

// Use a CSS variable for the grid color for easy management
const GridBackground: React.FC = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[var(--background)] bg-[linear-gradient(to_right,var(--grid-color,rgba(139,92,246,0.025))_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color,rgba(139,92,246,0.025))_1px,transparent_1px)] bg-[size:14px_24px]" />
);

export default GridBackground;
