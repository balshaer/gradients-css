import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CopyHistorySection } from "@/components/sections/CopyHistorySection";
import { ColorFilter } from "@/components/controls/ColorFilter";
import { Plus, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface GradientControlsProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedColors: string[];
  setSelectedColors: Dispatch<SetStateAction<string[]>>;
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<string>>;
  availableColors: string[];
  openCreator: () => void;
  onGradientFromHistory: (gradientName: string) => void;
}

export const GradientControls: React.FC<GradientControlsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedColors,
  setSelectedColors,
  filter,
  setFilter,
  availableColors,
  openCreator,
  onGradientFromHistory
}) => (
  <div className="flex justify-between gap-4 items-center">
    {/* Searchbox */}
    <div className="relative w-full">
      <div className="group relative transition-all duration-300 w-full" id="input">
        <Input
          placeholder="Search by color name or keyword..."
          className="h-12 w-full rounded-lg border border-border bg-background px-4 pr-12 text-foreground transition-all duration-300 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
      </div>
    </div>
    {/* Controls */}
    <div className="flex items-center justify-center gap-2">
      <ColorFilter
        availableColors={availableColors}
        selectedColors={selectedColors}
        onColorChange={setSelectedColors}
      />
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="h-11 w-full rounded-lg border-border transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent className="rounded-lg border-border shadow-xl">
          <SelectItem value="all">All Gradients</SelectItem>
          <SelectItem value="favorites">Favorites</SelectItem>
        </SelectContent>
      </Select>
      <CopyHistorySection onGradientSelect={onGradientFromHistory} />
      <Button
        variant="default"
        className="flex h-11 items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
        onClick={openCreator}
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">Create Gradient</span>
        <span className="sm:hidden">Create</span>
      </Button>
    </div>
  </div>
);
