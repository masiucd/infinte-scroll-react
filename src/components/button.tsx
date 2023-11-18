import {cva, VariantProps} from "class-variance-authority";
import {ButtonHTMLAttributes} from "react";

import {cn} from "@/utils/css";

let variants = cva("cursor-pointer", {
  variants: {
    variant: {
      classic:
        "relative bg-primary-400 transition-all duration-100 hover:opacity-75 active:top-1 active:bg-primary-700",
      solid: "bg-primary-400 hover:opacity-90 active:opacity-70",
      soft: "bg-primary-900 text-primary-200 hover:opacity-80 active:opacity-60",
      outline:
        "border border-primary-400 hover:border-primary-800 hover:opacity-90 active:opacity-70",
      ghost:
        "bg-transparent transition-all duration-100 hover:bg-primary-400 hover:text-white active:bg-primary-700 active:text-white",
    },
    size: {
      sm: "px-2 py-1 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-4 py-3 text-lg",
      xl: "px-5 py-4 text-xl",
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-xl",
      xl: "rounded-2xl",
      none: "rounded-none",
    },
  },
  defaultVariants: {
    variant: "classic",
    size: "md",
    radius: "md",
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants>;

export function Button({
  variant,
  children,
  className,
  size,
  radius,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(variants({variant, size, radius, className}))}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
