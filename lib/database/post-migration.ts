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
      CREATE INDEX excerpt_document_idx ON excerpt_document
          USING bm25 ("excerptId", body, "excerptTitle", "tagsSearchable", full_name, "referenceTitle")
          with (key_field = 'excerptId');

      CREATE INDEX excerpt_document_tags_gin_idx
        ON excerpt_document
        USING GIN (tags jsonb_path_ops);
      `);

    console.log("----| and were done!");
  } catch (error) {
    console.log(error);
  } finally {
    await connection.end();
  }
};

main();
