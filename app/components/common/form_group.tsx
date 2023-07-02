import type {ReactNode} from "react";

import {cn} from "~/lib/styles";

type FormGroupProps = {
  className?: string;
  children: ReactNode;
};

export function FormGroup({className, children}: FormGroupProps) {
  return <div className={cn("mb-1", className)}>{children}</div>;
}
