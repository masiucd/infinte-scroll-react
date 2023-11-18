import {type PropsWithChildren} from "react";

import {H1, Lead} from "@/components/text";

export default function Layout({children}: PropsWithChildren<{}>) {
  return (
    <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center">
      <aside className="w-full text-center">
        <H1>Login</H1>
        <Lead>Login to your account</Lead>
      </aside>
      {children}
    </section>
  );
}
