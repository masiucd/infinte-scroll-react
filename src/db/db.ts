import postgres from "postgres";

let localConfig = {
  user: "admin",
  host: "localhost",
  port: 5432,
  database: "postgres",
  password: "root",
  ssl: false,
};

let prodConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  ssl: true,
};

const sql = postgres(
  process.env.NODE_ENV === "production" ? prodConfig : localConfig
);

export default sql;
