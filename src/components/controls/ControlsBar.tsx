// Controls/ControlsBar.tsx
import { FC } from "react";
import { SearchBox } from "./SearchBox";
import { FilterSelector } from "./FilterSelector";
import { ColorFilter } from "@/components/controls/ColorFilter";
import { CreateGradientButton } from "./CreateGradientButton";
import { CopyHistorySection } from "@/components/sections/CopyHistorySection";

interface ControlsBarProps {
  searchTerm: string;
  onSearch: (s: string) => void;
  selectedColors: string[];
  onColorsChange: (c: string[]) => void;
  filter: string;
  onFilter: (f: string) => void;
  availableColors: string[];
  onCreatorOpen: () => void;
  onGradientFromHistory: (name: string) => void;
}

export const ControlsBar: FC<ControlsBarProps> = props => (
  <div className="flex justify-between gap-4 items-center">
    <SearchBox value={props.searchTerm} onChange={props.onSearch} />
    <div className="flex items-center gap-2">
      <ColorFilter
        availableColors={props.availableColors}
        selectedColors={props.selectedColors}
        onColorChange={props.onColorsChange}
      />
      <FilterSelector value={props.filter} onChange={props.onFilter} />
      <CopyHistorySection onGradientSelect={props.onGradientFromHistory} />
      <CreateGradientButton onClick={props.onCreatorOpen} />
    </div>
  </div>
);
