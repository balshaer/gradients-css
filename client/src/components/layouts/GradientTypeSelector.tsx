import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface GradientTypeSelectorProps {
  gradientType: "background" | "text";
  setGradientType: (type: "background" | "text") => void;
}

export const GradientTypeSelector: React.FC<GradientTypeSelectorProps> = ({
  gradientType,
  setGradientType,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="inline-flex">
      <div className="flex w-32 items-center justify-between rounded-md border border-border bg-secondary p-2 text-sm text-primary">
        <span>
          {gradientType.charAt(0).toUpperCase() + gradientType.slice(1)}
        </span>
        <ChevronDown className="h-4 w-4" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="w-32 rounded-md border border-border bg-secondary p-1"
    >
      {["background", "text"].map((type) => (
        <DropdownMenuItem
          key={type}
          onSelect={() => setGradientType(type as "background" | "text")}
          className="hover:bg-primary/10 cursor-pointer rounded px-2 py-1.5 text-sm text-primary"
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
