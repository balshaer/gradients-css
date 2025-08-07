// Controls/SearchBox.tsx
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { FC } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (v: string) => void;
}

export const SearchBox: FC<SearchBoxProps> = ({ value, onChange }) => (
  <div className="relative w-full">
    <Input
      placeholder="Search by color name or keyword..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="h-12 w-full rounded-lg border px-4 pr-12"
      type="text"
    />
    <SearchIcon className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2" />
  </div>
);
