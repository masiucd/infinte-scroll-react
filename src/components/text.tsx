import {type PropsWithChildren} from "react";

import {cn} from "@/utils/css";

type Props = {
  className?: string;
};

export function H1({children, className}: PropsWithChildren<Props>) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({children, className}: PropsWithChildren<Props>) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function H3({children, className}: PropsWithChildren<Props>) {
  return (
    <h3
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function H4({children, className}: PropsWithChildren<Props>) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}

export function P({children, className}: PropsWithChildren<Props>) {
  return <p className={cn("leading-7 ", className)}>{children}</p>;
}

export function Blockquote({children, className}: PropsWithChildren<Props>) {
  return (
    <blockquote className={cn("leading-7 ", className)}>{children}</blockquote>
  );
}

export function InlineCode({children, className}: PropsWithChildren<Props>) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
    >
      {children}
    </code>
  );
}

export function Small({children, className}: PropsWithChildren<Props>) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}

export function Lead({children, className}: PropsWithChildren<Props>) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}

export function Muted({children, className}: PropsWithChildren<Props>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}

export function Large({children, className}: PropsWithChildren<Props>) {
  return <p className={cn("text-lg font-semibold", className)}>{children}</p>;
}

export function List({children, className}: PropsWithChildren<Props>) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  );
}

interface HighlighterProps extends Props {
  classNameTopWrapper?: string;
}
export function Highlighter({
  children,
  className,
  classNameTopWrapper,
}: PropsWithChildren<HighlighterProps>) {
  return (
    <span
      className={cn(
        "relative after:absolute after:bottom-2 after:left-0 after:z-10 after:h-4 after:w-full after:-rotate-1 after:rounded-t after:bg-primary-400/80 dark:after:bg-primary-600 after:transition-all after:hover:w-full",
        classNameTopWrapper
      )}
    >
      <span className={cn("relative z-20 inline-block", className)}>
        {children}
      </span>
    </span>
  );
}
