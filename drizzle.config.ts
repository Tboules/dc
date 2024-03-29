import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./lib/database/schema/*",
  out: "./lib/database/drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  },
});
