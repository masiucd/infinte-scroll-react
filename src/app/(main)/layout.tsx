import {type PropsWithChildren} from "react";

import {H1, Lead} from "@/components/text";

export default function Layout({children}: PropsWithChildren<{}>) {
  return (
    <div>
      <aside>
        <H1>My working journal</H1>
        <Lead>A journal of my work and life</Lead>
      </aside>
      {children}
    </div>
  );
}
