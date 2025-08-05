import { useState } from "react";
import { Plus, Minus, Palette, Save, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { AngleSlider } from "@/components/controls/AngleSlider";
import { useCopyState } from "@/hooks/useCopyState";
import { useColorFormat } from "@/hooks/useColorFormat";
import { animatedGradientUtils } from "@/utils/animatedGradientUtils";
import { toast } from "@/hooks/use-toast";

interface GradientCreatorProps {
  onSave?: (gradient: { name: string; colors: string[] }) => void;
}

export function GradientCreator({ onSave }: GradientCreatorProps) {
  const [colors, setColors] = useState<string[]>(["#FF6B6B", "#4ECDC4"]);
  const [angle, setAngle] = useState(135);
  const [gradientName, setGradientName] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  
  const { getColorInFormat } = useColorFormat();
  const { copyToClipboard } = useCopyState(gradientName, colors);

  const addColor = () => {
    if (colors.length < 5) {
      const newColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
      setColors([...colors, newColor]);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const generateRandomGradient = () => {
    const randomColors = Array.from({ length: 2 + Math.floor(Math.random() * 2) }, () => 
      `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`
    );
    setColors(randomColors);
    setAngle(Math.floor(Math.random() * 360));
  };

  const saveGradient = () => {
    if (!gradientName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your gradient.",
      });
      return;
    }

    if (onSave) {
      onSave({
        name: gradientName.trim(),
        colors: colors
      });
      toast({
        title: "Gradient saved!",
        description: `"${gradientName}" has been saved to your collection.`,
      });
      setGradientName("");
    }
  };

  const getCode = (format: string) => {
    const formattedColors = colors.map((color) => getColorInFormat(color));
    
    const animatedOptions = {
      colors: formattedColors,
      angle,
      isAnimated,
      animationSpeed,
      gradientType: "background" as const,
    };

    switch (format) {
      case "tailwind":
        return animatedGradientUtils.generateAnimatedTailwind(animatedOptions);
      case "css":
        return animatedGradientUtils.generateAnimatedCSS(animatedOptions);
      case "sass":
        return animatedGradientUtils.generateAnimatedSass(animatedOptions);
      default:
        const gradientStyle = `linear-gradient(${angle}deg, ${formattedColors.join(", ")})`;
        return `background: ${gradientStyle};`;
    }
  };

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${colors.join(", ")})`,
    backgroundSize: isAnimated ? "400% 400%" : "100% 100%",
    animation: isAnimated ? `gradientShift ${4 / animationSpeed}s ease infinite` : "none",
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Create Gradient</h2>
            <p className="text-sm text-muted-foreground">Design your custom gradient</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Preview & Settings */}
        <div className="space-y-6">
          {/* Preview */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Live Preview</Label>
            <div 
              className="w-full h-48 rounded-xl border border-border relative overflow-hidden shadow-lg"
              style={gradientStyle}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-white text-sm font-medium">
                    {gradientName || "Your Gradient"}
                  </p>
                  <p className="text-white/70 text-xs">
                    {colors.length} colors • {angle}°
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient Name */}
          <div className="space-y-3">
            <Label htmlFor="gradient-name" className="text-base font-medium">Gradient Name</Label>
            <Input
              id="gradient-name"
              placeholder="Enter a unique name..."
              value={gradientName}
              onChange={(e) => setGradientName(e.target.value)}
              className="h-11"
            />
          </div>

          {/* Animation Controls */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
            <Label className="text-base font-medium">Animation Settings</Label>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="animated"
                checked={isAnimated}
                onChange={(e) => setIsAnimated(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <Label htmlFor="animated" className="text-sm">Enable Animation</Label>
            </div>
            
            {isAnimated && (
              <div className="space-y-3">
                <Label className="text-sm">Speed: {animationSpeed}x</Label>
                <Slider
                  value={[animationSpeed]}
                  onValueChange={(value) => setAnimationSpeed(value[0])}
                  min={0.1}
                  max={3}
                  step={0.1}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Controls & Code */}
        <div className="space-y-6">
          {/* Colors */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Colors ({colors.length})</Label>
              <div className="flex gap-2">
                <Button
                  onClick={addColor}
                  size="sm"
                  variant="outline"
                  disabled={colors.length >= 5}
                  title="Add Color"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  onClick={generateRandomGradient}
                  size="sm"
                  variant="outline"
                  title="Random Gradient"
                >
                  <Palette className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                  />
                  <Input
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="font-mono text-sm flex-1"
                  />
                  {colors.length > 2 && (
                    <Button
                      onClick={() => removeColor(index)}
                      size="sm"
                      variant="outline"
                      title="Remove Color"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Angle Control */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Direction: {angle}°</Label>
            <AngleSlider 
              angle={angle} 
              setAngle={setAngle}
            />
          </div>

          {/* Code Preview */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Generated CSS</Label>
            <div className="bg-muted/50 p-4 rounded-lg border border-border font-mono text-sm overflow-x-auto">
              <pre className="text-foreground/90">{getCode("css")}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="flex flex-wrap gap-3 pt-6 border-t border-border">
        <Button 
          onClick={saveGradient} 
          disabled={!gradientName.trim()}
          className="flex-1 sm:flex-none"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Gradient
        </Button>
        
        <Button
          onClick={() => copyToClipboard(getCode("css"), "css")}
          variant="outline"
          className="flex-1 sm:flex-none"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy CSS
        </Button>
        
        <Button
          onClick={() => copyToClipboard(getCode("tailwind"), "tailwind")}
          variant="outline"
          className="flex-1 sm:flex-none"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Tailwind
        </Button>
      </div>

      {/* Add CSS for animation */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}