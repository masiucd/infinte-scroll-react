// import sql from "@/db/db";

// import {User} from "./record";

// export async function getUserById(id: number): Promise<User | null> {
//   let rows =
//     await sql`select u.id,u.name,u.email,u.password,u.admin,u.created_at from users u WHERE u.id = ${id}`;
//   let user = rows[0];
//   if (!user) {
//     return null;
//   }
//   return new User(
//     user.id,
//     user.email,
//     user.password,
//     user.name,
//     user.admin,
//     user.created_at
//   );
// }
