import {type PropsWithChildren} from "react";

export default function Layout({children}: PropsWithChildren<{}>) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
      {children}
    </section>
  );
}
