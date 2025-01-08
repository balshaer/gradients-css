import { Slider } from "@/components/ui/slider";
import { FaArrowRotateLeft } from "react-icons/fa6";

interface AngleSliderProps {
  angle: number;
  setAngle: (angle: number) => void;
}

export const AngleSlider: React.FC<AngleSliderProps> = ({
  angle,
  setAngle,
}) => (
  <div className="flex w-full items-center space-x-2">
    <Slider
      value={[angle]}
      onValueChange={(value) => setAngle(value[0])}
      max={360}
      step={1}
      className="flex-grow"
    />
    <span className="text-sm font-medium text-primary">{angle}°</span>
    <FaArrowRotateLeft
      className="flex h-full cursor-pointer items-center justify-center text-primary"
      onClick={() => setAngle(90)}
    />
  </div>
);
