import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";

export const HeroHeader: React.FC = () => (
  <div className="space-y-6">
    {/* GitHub Link */}
    <a
      href="https://github.com/balshaer/gradients-css"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex w-full items-center justify-center">
        <div
          className={cn(
            "group rounded-full border border-border bg-card text-base text-[var(--muted)] transition-all ease-in hover:cursor-pointer dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >


          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 text-primary transition ease-out hover:duration-300 max-md:text-xs">
            <span>✨ Contribute to The Project</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
      </div>
    </a>

    {/* Main Title */}
    <h1 className="pt-6 text-center text-3xl font-medium text-primary dark:text-gray-50 sm:text-6xl">
      Collection of modern,
      <span className="relative ps-1">
        <span className="relative">
          Gradients
        </span>
       <img
  className="absolute h-[150px] left-[190px] w-[120px] bottom-0 top-[45px] right-0 -rotate-45 max-[923px]:hidden"
  src="/app/assets/arrow.svg"
  alt="icon"
/>

      </span>
    </h1>

    {/* Subtitle */}
    <p className="mx-auto max-w-[600px] text-center text-muted-foreground">
      Discover beautiful CSS gradients for your next project. Copy, export, and use them anywhere.
    </p>
  </div>
);
