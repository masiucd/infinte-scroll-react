import {sql} from "@vercel/postgres";

export default async function Home() {
  let {rows} = await sql`SELECT * FROM users`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello</h1>
      <p>{rows[0].name}</p>
    </main>
  );
}
