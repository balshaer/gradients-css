import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 3000,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "mapbox-gl": "mapbox-gl/dist/mapbox-gl.js",
    },
  },
});
