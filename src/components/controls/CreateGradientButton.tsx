// Controls/CreateGradientButton.tsx
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FC } from "react";

interface Props {
  onClick: () => void;
}
export const CreateGradientButton: FC<Props> = ({ onClick }) => (
  <Button onClick={onClick} className="flex h-11 gap-2">
    <Plus className="h-4 w-4" />
    <span className="hidden sm:inline">Create Gradient</span>
    <span className="sm:hidden">Create</span>
  </Button>
);
