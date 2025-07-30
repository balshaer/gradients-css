import { useState } from "react";
import { Download, Image, FileImage, Palette, Code, Smartphone, Monitor, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { exportUtils, ExportOptions, GradientData } from "@/utils/exportUtils";
import { toast } from "@/hooks/use-toast";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  gradientData: GradientData;
}

export function ExportModal({
  isOpen,
  onClose,
  gradientData,
}: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<
    "png" | "jpg" | "webp" | "mesh"
  >("png");
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(600);
  const [quality, setQuality] = useState([90]);
  const [angle] = useState([45]);
  const [meshComplexity, setMeshComplexity] = useState([5]);
  const [isExporting, setIsExporting] = useState(false);

  const sizePresets = exportUtils.getSizePresets();
  const formatOptions = exportUtils.getFormatOptions();

  const getCurrentSize = () => {
    if (selectedSize === "Custom") {
      return { width: customWidth, height: customHeight };
    }
    const preset = sizePresets.find((p) => p.name === selectedSize);
    return preset || { width: 800, height: 600 };
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const size = getCurrentSize();
      const options: ExportOptions = {
        format: selectedFormat,
        width: size.width,
        height: size.height,
        quality:
          selectedFormat === "jpg" || selectedFormat === "webp"
            ? quality[0] / 100
            : undefined,
        angle: angle[0],
        meshComplexity: meshComplexity[0],
      };

      await exportUtils.exportGradient(gradientData, options);

      // Show success message for download
      toast({
        title: "Export Successful",
        description: `${gradientData.name} exported as ${selectedFormat.toUpperCase()}`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Export Failed",
        description:
          "There was an error exporting your gradient. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "svg":
        return <Palette className="h-4 w-4" />;
      case "png":
      case "jpg":
      case "webp":
        return <Image className="h-4 w-4" />;
      case "json":
        return <FileImage className="h-4 w-4" />;
      case "css":
      case "less":
      case "scss":
        return <Code className="h-4 w-4" />;
      case "android":
        return <Smartphone className="h-4 w-4" />;
      case "ios":
        return <Monitor className="h-4 w-4" />;
      case "figma":
      case "sketch":
        return <Layers className="h-4 w-4" />;
      case "mesh":
        return <Palette className="h-4 w-4" />;
      default:
        return <Image className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
     
   
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-2">
            <Label>Format</Label>
            <Select
              value={selectedFormat}
              onValueChange={(value) => setSelectedFormat(value as "png" | "jpg" | "webp" | "mesh")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    <div className="flex items-center gap-1  ">
                      {getFormatIcon(format.value)}
                      <div className="flex items-center gap-3">
                        <div className="font-medium">{format.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {format.description}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Gradient Preview */}
          <div className="space-y-3">
        

            {/* Frame-like preview container */}
            <div className="">
              {/* Photo frame effect */}
              <div className="relative overflow-hidden rounded-lg border-4 border-[var(--border)] shadow-lg bg-[var(--card)] transition-transform duration-300 ">
                <div className="relative">
                  {/* Dynamic height based on aspect ratio */}
                  <div
                    className={`w-full ${
                      selectedSize === "Large" || selectedSize === "4K" ? "h-24" : // 16:9 aspect ratio
                      selectedSize === "Small" ? "h-32" : // 1:1 aspect ratio
                      selectedSize === "Custom" ?
                        (customWidth > customHeight ? "h-24" : "h-32") :
                        "h-28" // Default medium
                    }`}
                    style={{
                      background: `linear-gradient(${gradientData.angle || 45}deg, ${gradientData.colors.join(", ")})`,
                    }}
                  />

                  {/* Overlay with gradient name */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-lg bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm border border-white/20">
                      {gradientData.name}
                    </div>
                  </div>

                  {/* Format badge with download icon */}
                  <div className="absolute top-3 right-3">
                    <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-gray-800 shadow-sm border border-gray-200 flex items-center gap-1">
                      {selectedFormat.toUpperCase()}
                    </div>
                  </div>

                  {/* Quality indicator for image formats */}
                  {selectedFormat !== "mesh" && (
                    <div className="absolute top-3 left-3">
                      <div className="rounded-full bg-green-500/90 px-2 py-1 text-xs font-medium text-white shadow-sm">
                        {quality[0]}% Quality
                      </div>
                    </div>
                  )}

                  {/* Size indicator */}
                  <div className="absolute bottom-3 left-3">
                    <div className="rounded-lg bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm border border-white/20">
                      {selectedSize === "Custom" ? `${customWidth}×${customHeight}px` :
                       selectedSize === "Small" ? "400×400px" :
                       selectedSize === "Medium" ? "800×600px" :
                       selectedSize === "Large" ? "1920×1080px" :
                       selectedSize === "4K" ? "3840×2160px" : selectedSize}
                    </div>
                  </div>

                  {/* Mesh gradient special effect */}
                  {selectedFormat === "mesh" && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 right-3">
                        <div className="rounded-full bg-purple-500/90 px-2 py-1 text-xs font-medium text-white shadow-sm">
                          Mesh
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Frame shadow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-black/5 pointer-events-none" />
            </div>

     
          </div>

          {/* Size Selection - only for image formats */}
          {!["css", "ios", "less", "scss", "figma", "sketch", "json"].includes(selectedFormat) && (
            <div className="space-y-2">
              <Label>Size</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sizePresets.map((preset) => (
                    <SelectItem key={preset.name} value={preset.name}>
                      {preset.name} ({preset.width} × {preset.height})
                    </SelectItem>
                  ))}
                  <SelectItem value="Custom">Custom Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Custom Size Inputs */}
          {selectedSize === "Custom" && !["css", "ios", "less", "scss", "figma", "sketch", "json"].includes(selectedFormat) && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Width</Label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(Number(e.target.value))}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  min="100"
                  max="4000"
                />
              </div>
              <div className="space-y-2">
                <Label>Height</Label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(Number(e.target.value))}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  min="100"
                  max="4000"
                />
              </div>
            </div>
          )}

          {/* Quality Slider for JPG/WebP */}
          {(selectedFormat === "jpg" || selectedFormat === "webp") && (
            <div className="space-y-2">
              <Label>Quality: {quality[0]}%</Label>
              <Slider
                value={quality}
                onValueChange={setQuality}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
            </div>
          )}



          {/* Mesh Complexity for mesh gradients */}
          {selectedFormat === "mesh" && (
            <div className="space-y-2">
              <Label>Mesh Complexity: {meshComplexity[0]}</Label>
              <Slider
                value={meshComplexity}
                onValueChange={setMeshComplexity}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          )}

          {/* Preview Info */}
          <div className="rounded-lg bg-muted p-3 text-sm">
            <div className="text-muted-foreground">
              Format: {selectedFormat.toUpperCase()}
              {!["css", "ios", "less", "scss", "figma", "sketch"].includes(selectedFormat) &&
                ` • Size: ${getCurrentSize().width} × ${getCurrentSize().height}px`}
              {(selectedFormat === "jpg" || selectedFormat === "webp") &&
                ` • Quality: ${quality[0]}%`}
              {!["json", "figma", "sketch"].includes(selectedFormat) &&
                ` • Angle: ${angle[0]}°`}
              {selectedFormat === "mesh" &&
                ` • Complexity: ${meshComplexity[0]}`}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
