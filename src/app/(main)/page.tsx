import Link from "next/link";

import {H1, Lead} from "@/components/text";

export default function Home() {
  return (
    <div className="flex flex-1 items-center">
      <div className="flex flex-col gap-2 p-10">
        <aside className="flex flex-col gap-2">
          <H1>My working journal</H1>
          <Lead>A journal of my work and life</Lead>
        </aside>
        <div className="flex gap-5">
          <Link href="/login">Login</Link>
          <Link href="/journal">Journal</Link>
        </div>
      </div>
    </div>
  );
}
