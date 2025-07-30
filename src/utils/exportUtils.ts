// Utility functions for exporting gradients as images

export interface ExportOptions {
  format: "svg" | "png" | "jpg" | "webp" | "json" | "css" | "android" | "ios" | "less" | "scss" | "figma" | "sketch" | "mesh";
  width: number;
  height: number;
  quality?: number; // For JPG/WebP (0-1)
  angle?: number; // Gradient angle in degrees
  meshComplexity?: number; // For mesh gradients (1-10)
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

      switch (options.format) {
        case "svg":
          const svgCode = exportUtils.generateSVG(gradientData, options);
          await exportUtils.copyToClipboard(svgCode);
          break;

        case "png":
        case "jpg":
        case "webp":
          const svgForImage = exportUtils.generateSVG(gradientData, options);
          const dataURL = await exportUtils.convertSVGToFormat(svgForImage, options);
          exportUtils.downloadFile(dataURL, filename, options.format);
          break;

        case "css":
          const cssCode = exportUtils.generateCSS(gradientData, options);
          await exportUtils.copyToClipboard(cssCode);
          break;

        case "json":
          const jsonCode = exportUtils.generateJSON(gradientData, options);
          await exportUtils.copyToClipboard(jsonCode);
          break;

        case "android":
          const androidCode = exportUtils.generateAndroidXML(gradientData, options);
          await exportUtils.copyToClipboard(androidCode);
          break;

        case "ios":
          const iosCode = exportUtils.generateiOSSwift(gradientData, options);
          await exportUtils.copyToClipboard(iosCode);
          break;

        case "less":
          const lessCode = exportUtils.generateLess(gradientData, options);
          await exportUtils.copyToClipboard(lessCode);
          break;

        case "scss":
          const scssCode = exportUtils.generateSCSS(gradientData, options);
          await exportUtils.copyToClipboard(scssCode);
          break;

        case "figma":
          const figmaCode = exportUtils.generateFigma(gradientData, options);
          await exportUtils.copyToClipboard(figmaCode);
          break;

        case "sketch":
          const sketchCode = exportUtils.generateSketch(gradientData, options);
          await exportUtils.copyToClipboard(sketchCode);
          break;

        case "mesh":
          const meshSvg = exportUtils.generateMeshGradient(gradientData, options);
          const meshBlob = new Blob([meshSvg], { type: "image/svg+xml;charset=utf-8" });
          const meshUrl = URL.createObjectURL(meshBlob);
          exportUtils.downloadFile(meshUrl, `${filename}-mesh`, "svg");
          URL.revokeObjectURL(meshUrl);
          break;

        default:
          throw new Error(`Unsupported format: ${options.format}`);
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
  // Only downloadable formats (files that get downloaded)
  getFormatOptions: () => [
    { value: "png", label: "PNG", description: "High quality, transparent background support" },
    { value: "jpg", label: "JPG", description: "Smaller file size, good for photos" },
    { value: "webp", label: "WebP", description: "Modern format, excellent compression" },
    { value: "mesh", label: "Mesh Gradient", description: "SVG mesh gradient" },
  ],

  // Copyable formats (code that gets copied to clipboard)
  getCopyableFormats: () => [
    { value: "svg", label: "SVG", description: "Vector format, scalable" },
    { value: "json", label: "JSON", description: "Data format for design tools" },
    { value: "android", label: "Android XML", description: "Android gradient drawable" },
    { value: "css", label: "CSS", description: "CSS gradient code" },
    { value: "ios", label: "iOS Swift", description: "Swift CAGradientLayer code" },
    { value: "less", label: "Less", description: "Less preprocessor code" },
    { value: "scss", label: "SCSS", description: "SCSS preprocessor code" },
    { value: "figma", label: "Figma", description: "Figma plugin compatible" },
    { value: "sketch", label: "Sketch", description: "Sketch plugin compatible" },
  ],

  // Generate CSS gradient code
  generateCSS: (gradientData: GradientData, options: ExportOptions): string => {
    const { colors, angle = 45 } = gradientData;
    const gradientAngle = options.angle || angle;
    const colorStops = colors.join(', ');
    return `background: linear-gradient(${gradientAngle}deg, ${colorStops});`;
  },

  // Generate JSON export
  generateJSON: (gradientData: GradientData, options: ExportOptions): string => {
    const exportData = {
      name: gradientData.name,
      colors: gradientData.colors,
      angle: options.angle || 45,
      type: "linear-gradient",
      format: "css",
      metadata: {
        exportedAt: new Date().toISOString(),
        tool: "GradientsCSS",
        version: "1.0.0"
      }
    };
    return JSON.stringify(exportData, null, 2);
  },

  // Generate Android XML
  generateAndroidXML: (gradientData: GradientData, options: ExportOptions): string => {
    const { colors, name } = gradientData;
    const angle = options.angle || 45;

    // Convert angle to Android orientation (for future use)
    // let orientation = "TOP_BOTTOM";
    // if (angle >= 315 || angle < 45) orientation = "LEFT_RIGHT";
    // else if (angle >= 45 && angle < 135) orientation = "BL_TR";
    // else if (angle >= 135 && angle < 225) orientation = "BOTTOM_TOP";
    // else if (angle >= 225 && angle < 315) orientation = "BR_TL";

    const colorItems = colors.map((color, index) => {
      const offset = colors.length === 1 ? 0 : index / (colors.length - 1);
      return `    <item android:offset="${offset}" android:color="${color}" />`;
    }).join('\n');

    return `<?xml version="1.0" encoding="utf-8"?>
<!-- ${name} gradient -->
<shape xmlns:android="http://schemas.android.com/apk/res/android">
  <gradient
    android:type="linear"
    android:angle="${angle}"
    android:startColor="${colors[0]}"
    android:endColor="${colors[colors.length - 1]}">
${colorItems}
  </gradient>
</shape>`;
  },

  // Generate iOS Swift code
  generateiOSSwift: (gradientData: GradientData, options: ExportOptions): string => {
    const { colors, name } = gradientData;
    const angle = options.angle || 45;

    // Convert angle to start/end points
    const radians = (angle * Math.PI) / 180;
    const startX = 0.5 + 0.5 * Math.cos(radians + Math.PI);
    const startY = 0.5 + 0.5 * Math.sin(radians + Math.PI);
    const endX = 0.5 + 0.5 * Math.cos(radians);
    const endY = 0.5 + 0.5 * Math.sin(radians);

    const colorArray = colors.map(color => `UIColor(hex: "${color}").cgColor`).join(', ');
    const locations = colors.map((_, index) =>
      colors.length === 1 ? '0.0' : (index / (colors.length - 1)).toFixed(2)
    ).join(', ');

    return `// ${name} gradient
let ${name.toLowerCase().replace(/\s+/g, '')}Gradient = CAGradientLayer()
${name.toLowerCase().replace(/\s+/g, '')}Gradient.colors = [${colorArray}]
${name.toLowerCase().replace(/\s+/g, '')}Gradient.locations = [${locations}]
${name.toLowerCase().replace(/\s+/g, '')}Gradient.startPoint = CGPoint(x: ${startX.toFixed(2)}, y: ${startY.toFixed(2)})
${name.toLowerCase().replace(/\s+/g, '')}Gradient.endPoint = CGPoint(x: ${endX.toFixed(2)}, y: ${endY.toFixed(2)})
${name.toLowerCase().replace(/\s+/g, '')}Gradient.frame = view.bounds
view.layer.insertSublayer(${name.toLowerCase().replace(/\s+/g, '')}Gradient, at: 0)`;
  },

  // Generate Less code
  generateLess: (gradientData: GradientData, options: ExportOptions): string => {
    const { colors, name } = gradientData;
    const angle = options.angle || 45;
    const colorStops = colors.join(', ');
    const mixinName = name.toLowerCase().replace(/\s+/g, '-');

    return `.${mixinName}-gradient() {
  background: linear-gradient(${angle}deg, ${colorStops});
}

// Usage: .${mixinName}-gradient();`;
  },

  // Generate SCSS code
  generateSCSS: (gradientData: GradientData, options: ExportOptions): string => {
    const { colors, name } = gradientData;
    const angle = options.angle || 45;
    const colorStops = colors.join(', ');
    const mixinName = name.toLowerCase().replace(/\s+/g, '-');

    return `@mixin ${mixinName}-gradient($angle: ${angle}deg) {
  background: linear-gradient($angle, ${colorStops});
}

// Usage: @include ${mixinName}-gradient();`;
  },

  // Generate Figma plugin compatible format
  generateFigma: (gradientData: GradientData, options: ExportOptions): string => {
    const { colors, name } = gradientData;
    const angle = options.angle || 45;

    const gradientStops = colors.map((color, index) => ({
      color: color,
      position: colors.length === 1 ? 0 : index / (colors.length - 1)
    }));

    const figmaData = {
      name: name,
      type: "GRADIENT_LINEAR",
      gradientStops: gradientStops,
      gradientTransform: [
        [Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180), 0],
        [-Math.sin(angle * Math.PI / 180), Math.cos(angle * Math.PI / 180), 0]
      ]
    };

    return JSON.stringify(figmaData, null, 2);
  },

  // Generate Sketch plugin compatible format
  generateSketch: (gradientData: GradientData, _options: ExportOptions): string => {
    const { colors } = gradientData;
    // const angle = _options.angle || 45; // For future use

    const sketchGradient = {
      "_class": "gradient",
      "elipseLength": 0,
      "from": "{0.5, 0}",
      "gradientType": 0,
      "to": "{0.5, 1}",
      "stops": colors.map((color, index) => ({
        "_class": "gradientStop",
        "color": {
          "_class": "color",
          "alpha": 1,
          "blue": parseInt(color.slice(5, 7), 16) / 255,
          "green": parseInt(color.slice(3, 5), 16) / 255,
          "red": parseInt(color.slice(1, 3), 16) / 255
        },
        "position": colors.length === 1 ? 0 : index / (colors.length - 1)
      }))
    };

    return JSON.stringify(sketchGradient, null, 2);
  },

  // Generate mesh gradient SVG
  generateMeshGradient: (gradientData: GradientData, options: ExportOptions): string => {
    const { colors, name } = gradientData;
    const { width, height, meshComplexity = 5 } = options;

    // Create a simple mesh gradient using multiple radial gradients
    const meshPoints: Array<{id: string, x: number, y: number, color: string, radius: number}> = [];
    for (let i = 0; i < meshComplexity; i++) {
      const x = (Math.random() * 0.8 + 0.1) * 100; // 10-90%
      const y = (Math.random() * 0.8 + 0.1) * 100; // 10-90%
      const color = colors[Math.floor(Math.random() * colors.length)];
      const radius = Math.random() * 30 + 20; // 20-50%

      meshPoints.push({
        id: `mesh-${i}`,
        x, y, color, radius
      });
    }

    const gradientDefs = meshPoints.map(point => `
    <radialGradient id="${point.id}" cx="${point.x}%" cy="${point.y}%" r="${point.radius}%">
      <stop offset="0%" stop-color="${point.color}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${point.color}" stop-opacity="0"/>
    </radialGradient>`).join('');

    const circles = meshPoints.map(point => `
    <circle cx="${point.x}%" cy="${point.y}%" r="${point.radius}%" fill="url(#${point.id})"/>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${gradientDefs}
  </defs>
  <rect width="100%" height="100%" fill="${colors[0]}"/>
  ${circles}
  <text x="50%" y="95%" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.8)">${name}</text>
</svg>`;
  },

  // Copy text to clipboard
  copyToClipboard: async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  },
};
