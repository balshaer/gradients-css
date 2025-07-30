import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CodePreview } from "../layouts/CodePreview";

interface CopyCodeSectionProps {
  getCode: (format: string) => string;
  copiedStates: Record<string, boolean>;
  copyToClipboard: (text: string, key: "tailwind" | "css" | "sass" | "bootstrap" | "xml" | "svg" | "json" | "colors") => void;
}

// SVG Icon Components
const TailwindIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
  </svg>
);

const CSSIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.413l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
  </svg>
);

const SassIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M10.6,16.2c-0.3,1.1-0.7,2.1-1.5,2.9 c-0.5,0.5-1.1,0.9-1.8,0.9c-0.7,0-1.1-0.4-1.1-1.1c0-1.1,0.6-2.1,1.4-2.8c0.8-0.7,1.8-1.1,2.9-1.1c0.1,0,0.1,0,0.2,0 C10.7,15.4,10.7,15.8,10.6,16.2z M16.6,14.4c-0.3,0-0.6,0.1-0.9,0.1c-1.3,0.2-1.5,0.4-1.7,0.9c-0.1,0.3-0.1,0.6-0.1,0.9 c0,1.1,0.4,1.8,1.1,2.2c0.4,0.2,0.9,0.3,1.4,0.3c1.1,0,2.1-0.4,2.8-1.1c0.7-0.7,1.1-1.7,1.1-2.8c0-0.7-0.2-1.3-0.6-1.8 C18.2,12.7,17.4,12.4,16.6,14.4z"/>
  </svg>
);

const BootstrapIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.1 21.98C4.2 21.81 2.78 20.79 2.06 19.62c-.72-1.17-.72-2.06 0-3.23.72-1.17 2.14-2.19 4.04-2.36.1-.01.2-.01.3-.01 1.5 0 2.9.6 3.9 1.6 1 1 1.6 2.4 1.6 3.9 0 .1 0 .2-.01.3-.17 1.9-1.19 3.32-2.36 4.04-1.17.72-2.06.72-3.23 0-.72-.44-1.3-1.02-1.74-1.74-.44-.72-.72-1.5-.72-2.32 0-.1 0-.2.01-.3.17-1.9 1.19-3.32 2.36-4.04 1.17-.72 2.06-.72 3.23 0 1.17.72 2.19 2.14 2.36 4.04.01.1.01.2.01.3 0 .82-.28 1.6-.72 2.32-.44.72-1.02 1.3-1.74 1.74z"/>
  </svg>
);

const XMLIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5,3H7L9,7L11,3H13L10,9L13,15H11L9,11L7,15H5L8,9L5,3M14,3H16V15H14V3M18,3H20V15H18V3Z"/>
  </svg>
);

const SVGIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 8.12,16.19 8.91,14.79C9.71,13.39 10.58,11.88 11.5,10.28C12.42,11.88 13.29,13.39 14.09,14.79C14.88,16.19 15.5,17.38 15.93,18.28C14.75,19.13 13.42,19.64 12,19.64C10.58,19.64 9.25,19.13 7.07,18.28M5.08,16.15C5.69,16.15 6.22,15.39 6.7,14.02C7.18,12.65 7.59,10.81 7.93,8.64C8.27,10.81 8.68,12.65 9.16,14.02C9.64,15.39 10.17,16.15 10.78,16.15C11.39,16.15 11.92,15.39 12.4,14.02C12.88,12.65 13.29,10.81 13.63,8.64C13.97,10.81 14.38,12.65 14.86,14.02C15.34,15.39 15.87,16.15 16.48,16.15C17.09,16.15 17.62,15.39 18.1,14.02C18.58,12.65 18.99,10.81 19.33,8.64C19.36,8.47 19.38,8.31 19.4,8.15C19.91,9.68 20.2,11.31 20.2,13C20.2,14.69 19.91,16.32 19.4,17.85C18.99,15.68 18.58,13.84 18.1,12.47C17.62,11.1 17.09,10.34 16.48,10.34C15.87,10.34 15.34,11.1 14.86,12.47C14.38,13.84 13.97,15.68 13.63,17.85C13.29,15.68 12.88,13.84 12.4,12.47C11.92,11.1 11.39,10.34 10.78,10.34C10.17,10.34 9.64,11.1 9.16,12.47C8.68,13.84 8.27,15.68 7.93,17.85C7.59,15.68 7.18,13.84 6.7,12.47C6.22,11.1 5.69,10.34 5.08,10.34C4.47,10.34 3.94,11.1 3.46,12.47C2.98,13.84 2.57,15.68 2.23,17.85C1.72,16.32 1.43,14.69 1.43,13C1.43,11.31 1.72,9.68 2.23,8.15C2.57,10.32 2.98,12.16 3.46,13.53C3.94,14.9 4.47,15.66 5.08,15.66Z"/>
  </svg>
);

const JSONIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5C3,3.9 3.9,3 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19Z"/>
  </svg>
);

export const CopyCodeSection: React.FC<CopyCodeSectionProps> = ({
  getCode,
  copiedStates,
  copyToClipboard,
}) => {
  const [activeTab, setActiveTab] = useState("tailwind");

  const codeFormats = [
    { key: "tailwind", label: "Tailwind CSS", icon: TailwindIcon, color: "#06B6D4" },
    { key: "css", label: "CSS", icon: CSSIcon, color: "#1572B6" },
    { key: "sass", label: "SASS/SCSS", icon: SassIcon, color: "#CF649A" },
    { key: "bootstrap", label: "Bootstrap", icon: BootstrapIcon, color: "#7952B3" },
    { key: "xml", label: "Android XML", icon: XMLIcon, color: "#A4C639" },
    { key: "svg", label: "SVG", icon: SVGIcon, color: "#FFB13B" },
    { key: "json", label: "JSON", icon: JSONIcon, color: "#000000" },
  ];

  return (
    <div className="space-y-3 max-w-full">

      {/* Code Format Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger className="nofocus relative w-full">
          <div className="flex items-center justify-between rounded-md border border-border bg-secondary p-2 text-sm text-primary">
            <div className="flex items-center gap-2">
              {(() => {
                const IconComponent = codeFormats.find(f => f.key === activeTab)?.icon;
                return IconComponent ? <IconComponent /> : null;
              })()}
              <span>{codeFormats.find(f => f.key === activeTab)?.label || activeTab}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 rounded-md border border-border bg-secondary p-1"
        >
          {codeFormats.map((format) => (
            <DropdownMenuItem
              key={format.key}
              onSelect={() => {
                setActiveTab(format.key);
              }}
              className="hover:bg-primary/10 cursor-pointer rounded px-2 py-1.5 text-sm text-primary"
            >
              <div className="flex items-center gap-2">
                <format.icon />
                <span>{format.label}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Code Preview with Copy Button */}
      <CodePreview
        code={getCode(activeTab)}
        copiedStates={copiedStates}
        activeTab={activeTab}
        copyToClipboard={(text, key) => {
          copyToClipboard(text, key as "tailwind" | "css" | "sass" | "bootstrap" | "colors");
        }}
      />
    </div>
  );
};
