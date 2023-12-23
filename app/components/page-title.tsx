import { cn } from "~/utils/cn";

export function TitleWithWrapper({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        "my-10 flex w-full flex-col gap-1  p-1 text-center sm:max-w-2xl",
        className,
      )}
    >
      <h1 className="text-5xl font-semibold leading-snug tracking-tighter sm:text-6xl">
        Work Journal
      </h1>
      <p className="tracking-tight text-gray-500">
        Doing and learnings in the world of software development
      </p>
      {children}
    </aside>
  );
}
