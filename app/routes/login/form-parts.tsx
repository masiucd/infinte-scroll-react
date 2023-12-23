import type { PropsWithChildren } from "react";
import { cn } from "~/utils/cn";

export function FormGroup({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("relative flex flex-col", className)}>{children}</div>
  );
}

export function Input({
  name,
  id,
  placeholder,
  type = "text",
  className,
}: {
  name: string;
  id: string;
  placeholder: string;
  type?: "text" | "password" | "email";
  className?: string;
}) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={cn(
        "peer h-10 w-full border-0  border-b-2 border-gray-300 bg-transparent text-gray-100 placeholder:text-transparent focus:border-primary-500 focus:outline-none  focus:ring-0 ",
        className,
      )}
    />
  );
}

export function Label({
  htmlFor,
  children,
  className,
}: {
  htmlFor: string;
  children: string;
  className?: string;
}) {
  return (
    <label
      className={cn(
        `absolute 
      -top-3.5
      left-1
      text-gray-950
      transition-all
      peer-placeholder-shown:top-2
      peer-placeholder-shown:text-base
    peer-placeholder-shown:text-gray-400
      peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600
    `,
        className,
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
