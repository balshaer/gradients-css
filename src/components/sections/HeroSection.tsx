import { HeroHeader } from "./HeroHeader";
import { HeroFeatures } from "./HeroFeatures";
import HeroUsers from "@/components/layouts/HeroUsers";

export const HeroSection: React.FC = () => (
  <header className="relative mx-auto max-w-6xl space-y-2 pt-[20px]">
    <HeroHeader />
    <HeroFeatures />
    <div className="flex w-full items-center justify-center pb-6">
      <HeroUsers />
    </div>
  </header>
);
