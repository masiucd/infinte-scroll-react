import {drizzle} from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import {sqliteTable, integer, text} from "drizzle-orm/sqlite-core";

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite);

export const entries = sqliteTable("entries", {
  id: integer("id"),
  type: text("type"),
  content: text("content"),
  createdAt: text("created_at"),
});

export type Entry = typeof entries.$inferSelect; // return type when querying
export type NewEntry = typeof entries.$inferInsert; // input type when inserting
