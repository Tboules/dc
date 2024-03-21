import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { NewDesertFigure, desertFigures } from "./schema/desertFigures";
import { DESERT_FIGURE_TITLE } from "../enums";
dotenv.config({ path: ".env.local" });

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  max: 1,
});
const db = drizzle(sql);

const main = async () => {
  try {
    const seedDesertFigures: NewDesertFigure[] = [
      {
        title: DESERT_FIGURE_TITLE.SAINT,
        firstName: "Antony",
        epithet: "the Great",
      },
      {
        title: DESERT_FIGURE_TITLE.FATHER,
        firstName: "Alexander",
        lastName: "Schmemann",
      },
    ];

    console.log("Seed Comencing...");
    await db.insert(desertFigures).values(seedDesertFigures);
    console.log("...Seed Concluding");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

main();
