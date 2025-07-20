import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";
import { excerptDocument } from "./schema";

dotenv.config({ path: ".env.local" });

const main = async () => {
  const connection = postgres(process.env.DATABASE_URL, {
    ssl: "require",
    max: 1,
  });
  try {
    console.log("Let's refresh the materialized views --->");
    const db = drizzle(connection);
    await db.refreshMaterializedView(excerptDocument);

    console.log("----> Finished!! :)");
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};

main();
