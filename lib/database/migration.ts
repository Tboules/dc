import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
dotenv.config({ path: ".env.local" });

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  max: 1,
});
const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "./lib/database/drizzle" });
    console.log("Great Success");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

main();
