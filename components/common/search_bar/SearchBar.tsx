import { Input } from "@/components/ui/input";
import { FunctionComponent } from "react";

interface SearchBarProps {}

const SearchBar: FunctionComponent<SearchBarProps> = () => {
  return (
    <Input
      className="max-w-md"
      type="text"
      placeholder="search by color name"
    />
  );
};

export default SearchBar;
