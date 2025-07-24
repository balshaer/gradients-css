import { useState } from "react";
import { Download, X, Image, FileImage, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
    "svg" | "png" | "jpg" | "webp"
  >("png");
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(600);
  const [quality, setQuality] = useState([90]);
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
      };

      await exportUtils.exportGradient(gradientData, options);

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
        return <Image className="h-4 w-4" />;
      case "jpg":
        return <FileImage className="h-4 w-4" />;
      case "webp":
        return <FileImage className="h-4 w-4" />;
      default:
        return <Image className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Gradient
          </DialogTitle>
          <DialogDescription>
            Export "{gradientData.name}" as an image file
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-2">
            <Label>Format</Label>
            <Select
              value={selectedFormat}
              onValueChange={(value: any) => setSelectedFormat(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    <div className="flex items-center gap-2">
                      {getFormatIcon(format.value)}
                      <div>
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

          {/* Size Selection */}
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

          {/* Custom Size Inputs */}
          {selectedSize === "Custom" && (
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

          {/* Preview Info */}
          <div className="rounded-lg bg-muted p-3 text-sm">
            <div className="mb-1 font-medium">Export Preview</div>
            <div className="text-muted-foreground">
              Format: {selectedFormat.toUpperCase()} • Size:{" "}
              {getCurrentSize().width} × {getCurrentSize().height}px
              {(selectedFormat === "jpg" || selectedFormat === "webp") &&
                ` • Quality: ${quality[0]}%`}
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
