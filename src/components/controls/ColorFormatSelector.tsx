import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ColorFormatSelectorProps {
  selectedColorFormat: string;
  setSelectedColorFormat: (format: string) => void;
  colorFormats: string[];
}

export const ColorFormatSelector: React.FC<ColorFormatSelectorProps> = ({
  selectedColorFormat,
  setSelectedColorFormat,
  colorFormats,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="nofocus inline-flex">
      <div className="flex w-24 items-center justify-between rounded-md border border-border bg-secondary p-2 text-sm text-primary">
        <span>{selectedColorFormat}</span>
        <ChevronDown className="h-4 w-4" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="w-24 rounded-md border border-border bg-secondary p-1"
    >
      {colorFormats.map((format) => (
        <DropdownMenuItem
          key={format}
          onSelect={() => {
            setSelectedColorFormat(format);
          }}
          className="hover:bg-primary/10 cursor-pointer rounded px-2 py-1.5 text-sm text-primary"
        >
          {format}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
