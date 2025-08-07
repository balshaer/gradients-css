// BrandKitDialog.tsx
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GradientCreator } from "@/components/sections/GradientCreator";
import { FC } from "react";

interface BrandKitDialogProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSave: (g: { name: string; colors: string[] }) => void;
}

export const BrandKitDialog: FC<BrandKitDialogProps> = ({ open, onOpenChange, onSave }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      <div />
    </DialogTrigger>
    <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
      <GradientCreator onSave={onSave} />
    </DialogContent>
  </Dialog>
);
