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
    console.log("Post Migration Script Running ----->");
    const db = drizzle(connection);
    await db.execute(sql`
      create index excerpt_document_idx on excerpt_document
          using bm25 ("excerptId", body, "excerptTitle", "tagsSearchable", full_name, "referenceTitle")
          with (key_field = 'excerptId');
      `);

    console.log("----| and were done!");
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};

main();
