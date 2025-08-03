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
    <div className="w-full max-w-2xl mx-auto border rounded-lg p-6 bg-card">
      <div className="mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Gradient Creator
        </h3>
      </div>
      <div className="space-y-6">
        {/* Preview */}
        <div className="space-y-3">
          <Label>Preview</Label>
          <div 
            className="w-full h-32 rounded-lg border relative overflow-hidden"
            style={gradientStyle}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Gradient Name */}
        <div className="space-y-2">
          <Label htmlFor="gradient-name">Gradient Name</Label>
          <Input
            id="gradient-name"
            placeholder="Enter gradient name..."
            value={gradientName}
            onChange={(e) => setGradientName(e.target.value)}
          />
        </div>

        {/* Colors */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Colors ({colors.length})</Label>
            <div className="flex gap-2">
              <Button
                onClick={addColor}
                size="sm"
                variant="outline"
                disabled={colors.length >= 5}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                onClick={generateRandomGradient}
                size="sm"
                variant="outline"
              >
                <Palette className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {colors.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => updateColor(index, e.target.value)}
                  className="w-12 h-8 rounded border cursor-pointer"
                />
                <Input
                  value={color}
                  onChange={(e) => updateColor(index, e.target.value)}
                  className="font-mono text-sm"
                />
                {colors.length > 2 && (
                  <Button
                    onClick={() => removeColor(index)}
                    size="sm"
                    variant="outline"
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
          <Label>Angle: {angle}°</Label>
          <AngleSlider 
            angle={angle} 
            setAngle={setAngle}
          />
        </div>

        {/* Animation Controls */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="animated"
              checked={isAnimated}
              onChange={(e) => setIsAnimated(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="animated">Animated</Label>
          </div>
          
          {isAnimated && (
            <div className="space-y-2">
              <Label>Animation Speed: {animationSpeed}x</Label>
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

        {/* Code Preview */}
        <div className="space-y-3">
          <Label>CSS Code</Label>
          <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
            <pre>{getCode("css")}</pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={saveGradient} disabled={!gradientName.trim()}>
            <Save className="h-4 w-4 mr-2" />
            Save Gradient
          </Button>
          
          <Button
            onClick={() => copyToClipboard(getCode("css"), "css")}
            variant="outline"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy CSS
          </Button>
          
          <Button
            onClick={() => copyToClipboard(getCode("tailwind"), "tailwind")}
            variant="outline"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Tailwind
          </Button>
        </div>
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