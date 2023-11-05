// import {sql} from "@vercel/postgres";

// import {getUserById} from "./persistence/user/queries";

export default async function Home() {
  // let {rows} = await sql`SELECT * FROM users`;
  // let user = await getUserById(1);
  // let user = null;
  // if (!user) {
  //   return <p>Not found</p>;
  // }

  return (
    <main>
      <h1>Hello</h1>
      {/* <p>{user.name}</p>
      <p>{user.email}</p> */}
    </main>
  );
}
