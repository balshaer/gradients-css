import { Input } from "@/components/ui/input";
import { FunctionComponent, ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({ onSearch }) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Input
      className="max-w-md"
      type="text"
      placeholder="Search by gradient name"
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
