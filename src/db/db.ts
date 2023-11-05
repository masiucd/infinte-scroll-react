import postgres from "postgres";

// TODO make local config

const sql = postgres({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  ssl: true,
}); // will use psql environment variables

export default sql;
