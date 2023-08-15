import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "~/lib/styles";

export let buttonVariants = cva(
  "rounded px-2 py-1 text-sm shadow disabled:cursor-not-allowed disabled:opacity-30",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 font-bold tracking-wide text-white transition-opacity duration-150 hover:opacity-40",
        secondary: "bg-gray-200",
        default: "bg-gray-100 font-bold hover:bg-gray-200 hover:shadow-lg",
        ghost: "bg-transparent",
      },
      size: {
        default: "h-9 min-w-[4rem]",
        sm: "h-7 min-w-[3rem]",
        lg: "h-11 min-w-[5rem]",
        icon: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({className, variant, size, ...props}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({variant, size, className}))}
      {...props}
    />
  );
}

export default Button;
