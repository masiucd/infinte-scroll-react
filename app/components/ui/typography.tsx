import type {PropsWithChildren} from "react";

import {cn} from "~/lib/styles";

type Props = {
  className?: string;
};

export function H1({children, className}: PropsWithChildren<Props>) {
  return (
    <h1 className={cn("mb-1 text-3xl font-bold tracking-tighter", className)}>
      {children}
    </h1>
  );
}

export function H2({children, className}: PropsWithChildren<Props>) {
  return (
    <h2 className={cn("mb-1 text-2xl font-bold tracking-tighter", className)}>
      {children}
    </h2>
  );
}

export function H3({children, className}: PropsWithChildren<Props>) {
  return (
    <h3 className={cn("mb-1 text-xl font-bold tracking-tighter", className)}>
      {children}
    </h3>
  );
}

export function H4({children, className}: PropsWithChildren<Props>) {
  return (
    <h4 className={cn("mb-1 text-lg font-bold tracking-tighter", className)}>
      {children}
    </h4>
  );
}

export function P({children, className}: PropsWithChildren<Props>) {
  return <p className={cn("mb-1 text-lg", className)}>{children}</p>;
}

export function Lead({children, className}: PropsWithChildren<Props>) {
  return (
    <p className={cn("mb-1 capitalize  text-lg text-gray-300", className)}>
      {children}
    </p>
  );
}

export function Blockquote({children, className}: PropsWithChildren<Props>) {
  return (
    <blockquote
      className={cn(
        "mb-1 text-lg italic border-l-4 border-gray-300 pl-4",
        className
      )}
    >
      {children}
    </blockquote>
  );
}

export function Ghost({children, className}: PropsWithChildren<Props>) {
  return (
    <p className={cn("mb-1 text-lg text-gray-300", className)}>{children}</p>
  );
}
