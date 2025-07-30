import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "h-full gap-1 flex bg-[var(--link)] max-md:h-12 capitalize font-bold items-center hover:shadow-xl justify-center rounded-lg cursor-pointer px-6 py-3 transition duration-100 transform bg-[var(--button)] border-2 border-[var(--button-border)] text-[var(--button-text)] hoverd hover:bg-[var(--button-hover)] hover:text-[var(--button-text-hover)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "h-full gap-1 flex max-md:h-12 capitalize font-bold items-center justify-center  bg-transparent rounded-lg cursor-pointer px-6 py-3 transition duration-100 transform border-[var(--button)] border-2 border-[var(--button-border)] text-[var(--outline-button-text)] hoverd hover:bg-[var(--button-hover)] hover:text-[var(--button-text-hover)]",
        secondary:
          "h-full gap-1 flex max-md:h-12 capitalize font-bold items-center justify-center rounded-lg cursor-pointer px-6 py-3 transition duration-100 transform bg-[var(--button)] border-2 border-[var(--button-border)] text-[var(--button-text)] hoverd hover:bg-[var(--button-hover)] hover:text-[var(--button-text-hover)]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        active:
          "transition duration-100 transform bg-[var(--active)] text-[var(--active-text)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon,
      isLoading,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {icon && !isLoading && <span className="mr-2">{icon}</span>}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
