import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";

dotenv.config({ path: ".env.local" });

const main = async () => {
  const connection = postgres(process.env.DATABASE_URL, {
    ssl: "require",
    max: 1,
  });
  try {
    console.log("Premigration Script Running ----->");
    const db = drizzle(connection);
    await db.execute(sql`DROP MATERIALIZED VIEW IF EXISTS excerpt_document;`);
    await db.execute(sql`DROP VIEW IF EXISTS live_excerpts_view;`);

    console.log("----> Onto the Migration");
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};

main();
