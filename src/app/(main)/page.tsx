import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex">
        <Link href="/login">Login</Link>
        <Link href="/journal">Journal</Link>
      </div>
    </div>
  );
}
