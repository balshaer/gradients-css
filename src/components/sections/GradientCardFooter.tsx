import { ColorSwatches } from "../controls/ColorSwatches";
import { AngleSlider } from "../controls/AngleSlider";
import { GradientControls } from "./GradientControls";
import { CopyCodeSection } from "./CopyCodeSection";
import { ColorPalette } from "./ColorPalette";
import { AnimatedCheckbox } from "../controls/AnimatedCheckbox";
import { AnimationSpeedControl } from "../controls/AnimationSpeedControl";

interface GradientCardFooterProps {
  gradient: { name: string; colors: string[] };
  getColorInFormat: (color: string) => string;
  copyToClipboard: (text: string, key: "tailwind" | "css" | "sass" | "bootstrap" | "xml" | "svg" | "json" | "colors") => void;
  selectedColorFormat: string;
  setSelectedColorFormat: (format: string) => void;
  colorFormats: string[];
  gradientType: "background" | "text";
  setGradientType: (type: "background" | "text") => void;
  angle: number;
  setAngle: (angle: number) => void;
  getCode: (format: string) => string;
  copiedStates: Record<string, boolean>;
  isAnimated: boolean;
  setIsAnimated: (animated: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
}

export const GradientCardFooter: React.FC<GradientCardFooterProps> = ({
  gradient,
  getColorInFormat,
  copyToClipboard,
  selectedColorFormat,
  setSelectedColorFormat,
  colorFormats,
  gradientType,
  setGradientType,
  angle,
  setAngle,
  getCode,
  copiedStates,
  isAnimated,
  setIsAnimated,
  animationSpeed,
  setAnimationSpeed,
}) => (
  <div className="flex flex-col items-start space-y-5 sm:space-y-6 max-w-full">
    <div className="flex w-full items-center justify-between gap-3 sm:gap-4">
      <ColorSwatches
        colors={gradient.colors}
        getColorInFormat={getColorInFormat}
        copyToClipboard={(text, key) => {
          copyToClipboard(text, key);
        }}
      />

      <GradientControls
        selectedColorFormat={selectedColorFormat}
        setSelectedColorFormat={setSelectedColorFormat}
        colorFormats={colorFormats}
        gradientType={gradientType}
        setGradientType={setGradientType}
      />
    </div>

    <AngleSlider
      angle={angle}
      setAngle={(newAngle) => {
        setAngle(newAngle);
      }}
    />

    {/* Animation Controls */}
    <div className="flex flex-col gap-3 sm:gap-4 w-full">
      <AnimatedCheckbox
        checked={isAnimated}
        onChange={setIsAnimated}
        label="Animate Gradient"
      />

      <AnimationSpeedControl
        speed={animationSpeed}
        onChange={setAnimationSpeed}
        disabled={!isAnimated}
      />
    </div>

    {/* Color Palette */}
    <ColorPalette colors={gradient.colors} gradientName={gradient.name} />

    {/* Copy Code Section */}
    <CopyCodeSection
      getCode={getCode}
      copiedStates={copiedStates}
      copyToClipboard={copyToClipboard}
    />
  </div>
);
