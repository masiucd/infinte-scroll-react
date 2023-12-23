import type { PropsWithChildren } from "react";
import { cn } from "~/utils/cn";

export function RouteWrapper({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section className={cn("mx-auto flex max-w-xl flex-1 flex-col", className)}>
      {children}
    </section>
  );
}
