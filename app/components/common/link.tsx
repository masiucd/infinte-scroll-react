import {Link as RemixLink} from "@remix-run/react";
import type {PropsWithChildren} from "react";

import {cn} from "~/lib/styles";

type Props = {
  className?: string;
  to: string;
};

function Link({className, to, children}: PropsWithChildren<Props>) {
  return (
    <RemixLink
      to={to}
      className={cn("text-lg text-gray-300 hover:text-gray-400", className)}
    >
      {children}
    </RemixLink>
  );
}

export default Link;
