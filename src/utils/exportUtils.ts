// Utility functions for exporting gradients as images

export interface ExportOptions {
  format: "svg" | "png" | "jpg" | "webp";
  width: number;
  height: number;
  quality?: number; // For JPG/WebP (0-1)
}

export interface GradientData {
  name: string;
  colors: string[];
  angle: number;
  type: "background" | "text";
}

export const exportUtils = {
  // Generate SVG string for the gradient
  generateSVG: (gradientData: GradientData, options: ExportOptions): string => {
    const { colors, angle, name } = gradientData;
    const { width, height } = options;

    // Calculate gradient direction based on angle
    const radians = (angle * Math.PI) / 180;
    const x1 = Math.round(50 + 50 * Math.cos(radians + Math.PI / 2));
    const y1 = Math.round(50 + 50 * Math.sin(radians + Math.PI / 2));
    const x2 = Math.round(50 + 50 * Math.cos(radians - Math.PI / 2));
    const y2 = Math.round(50 + 50 * Math.sin(radians - Math.PI / 2));

    // Create color stops
    const colorStops = colors
      .map((color, index) => {
        const offset =
          colors.length === 1 ? 0 : (index / (colors.length - 1)) * 100;
        return `<stop offset="${offset}%" stop-color="${color}" />`;
      })
      .join("\n    ");

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
      ${colorStops}
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#gradient)" />
  <text x="50%" y="95%" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.8)">${name}</text>
</svg>`;
  },

  // Convert SVG to other formats using Canvas
  convertSVGToFormat: async (
    svgString: string,
    options: ExportOptions,
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      canvas.width = options.width;
      canvas.height = options.height;

      const img = new Image();
      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0, options.width, options.height);

        let mimeType = "image/png";
        let quality: number | undefined = undefined;

        switch (options.format) {
          case "png":
            mimeType = "image/png";
            break;
          case "jpg":
            mimeType = "image/jpeg";
            quality = options.quality || 0.9;
            break;
          case "webp":
            mimeType = "image/webp";
            quality = options.quality || 0.9;
            break;
        }

        const dataURL = canvas.toDataURL(mimeType, quality);
        URL.revokeObjectURL(url);
        resolve(dataURL);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Failed to load SVG"));
      };

      img.src = url;
    });
  },

  // Download file
  downloadFile: (dataURL: string, filename: string, format: string) => {
    const link = document.createElement("a");
    link.download = `${filename}.${format}`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Main export function
  exportGradient: async (
    gradientData: GradientData,
    options: ExportOptions,
  ): Promise<void> => {
    try {
      const filename = gradientData.name.toLowerCase().replace(/\s+/g, "-");

      if (options.format === "svg") {
        const svgString = exportUtils.generateSVG(gradientData, options);
        const svgBlob = new Blob([svgString], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);
        exportUtils.downloadFile(url, filename, "svg");
        URL.revokeObjectURL(url);
      } else {
        const svgString = exportUtils.generateSVG(gradientData, options);
        const dataURL = await exportUtils.convertSVGToFormat(
          svgString,
          options,
        );
        exportUtils.downloadFile(dataURL, filename, options.format);
      }
    } catch (error) {
      console.error("Export failed:", error);
      throw error;
    }
  },

  // Predefined size options
  getSizePresets: () => [
    { name: "Small", width: 400, height: 300 },
    { name: "Medium", width: 800, height: 600 },
    { name: "Large", width: 1200, height: 900 },
    { name: "HD", width: 1920, height: 1080 },
    { name: "Square Small", width: 400, height: 400 },
    { name: "Square Medium", width: 800, height: 800 },
    { name: "Square Large", width: 1200, height: 1200 },
  ],

  // Format options
  getFormatOptions: () => [
    { value: "svg", label: "SVG", description: "Vector format, scalable" },
    {
      value: "png",
      label: "PNG",
      description: "High quality, transparent background support",
    },
    {
      value: "jpg",
      label: "JPG",
      description: "Smaller file size, good for photos",
    },
    {
      value: "webp",
      label: "WebP",
      description: "Modern format, excellent compression",
    },
  ],
};
