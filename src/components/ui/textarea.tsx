import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-10 min-h-[80px] w-full rounded-md border-2 border-[#7b7b7b7b] bg-[var(--input-background)] px-3 py-2 text-sm text-[var(--input-text)] placeholder-[var(--paragraph)] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-[var(--input-border-color)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
