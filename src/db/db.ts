import postgres from "postgres";

// TODO make local config

// let localConfig = {
//   user: "postgres",
//   host: "localhost",
//   port: 5432,
// };

const sql = postgres({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  ssl: true,
}); // will use psql environment variables

export default sql;
