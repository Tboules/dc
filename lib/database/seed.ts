import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { NewDesertFigure, desertFigures } from "./schema/desertFigures";
import { DESERT_FIGURE_TITLE } from "../enums";
import { NewExcerpt } from "./schema/excerpts";
dotenv.config({ path: ".env.local" });

const CREATED_BY_ID = "d53d1855-14fa-4365-bb51-f30b29d28506";
const BOOK_REFERENCES = {
  paradiseOfTheFathers: "The Sayings of the Desert Fathers",
};

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  max: 1,
});
const db = drizzle(sql);

const main = async () => {
  try {
    console.log("Seed Comencing...");
    const DESERT_FIGURES_SEED: NewDesertFigure[] = [
      {
        title: DESERT_FIGURE_TITLE.SAINT,
        firstName: "Antony",
        epithet: "the Great",
        createdBy: CREATED_BY_ID,
      },
      {
        title: DESERT_FIGURE_TITLE.SAINT,
        firstName: "Macarius",
        epithet: "the Great",
        createdBy: CREATED_BY_ID,
      },
      {
        title: DESERT_FIGURE_TITLE.SAINT,
        firstName: "Moses",
        epithet: "the Strong",
        createdBy: CREATED_BY_ID,
      },
      {
        title: DESERT_FIGURE_TITLE.SAINT,
        firstName: "Basil",
        epithet: "the Great",
        createdBy: CREATED_BY_ID,
      },
      {
        title: DESERT_FIGURE_TITLE.SAINT,
        firstName: "Gregory",
        epithet: "the Theologian",
        createdBy: CREATED_BY_ID,
      },
      {
        title: DESERT_FIGURE_TITLE.FATHER,
        firstName: "Alexander",
        lastName: "Schmemann",
        createdBy: CREATED_BY_ID,
      },
      {
        title: DESERT_FIGURE_TITLE.FATHER,
        firstName: "Stephen",
        lastName: "Freeman",
        createdBy: CREATED_BY_ID,
      },
    ];

    const authorIds = await db
      .insert(desertFigures)
      .values(DESERT_FIGURES_SEED)
      .returning({ id: desertFigures.id });

    const EXCERPTS_SEED: NewExcerpt[] = [
      //0
      {
        body: "When the holy Abba Anthony lived in the desert he was beset by accidie (spiritual sloth), and attached by many sinful thoughts. He said to God, 'Lord, I want to be saved but these thoughts do not leave me alone; what shall I do in my affliction? How can I be saved?' A short while afterwards, when he got up to go out, Anthony saw a man like himself sitting down and plaiting a rope, then getting up again to pray. It was an angel of the Lord sent to correct and reassure him. He heard the angel saying to him, 'Do this and you will be saved.' At these words, Anthony was filled with joy and courage. He did this and he was saved.",
        title: "St. Antony Learns to Live in the Desert",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[0].id,
        createdBy: CREATED_BY_ID,
      },
      //1
      {
        body: "When the same Abba Anthony thought about the depth of the judgements of God, he asked, 'Lord, how is it that some die when they are young, while others drag on to extreme old age? Why are there those who are poor and those who are rich? Why do wicked men prosper and why are the just in need?' He heard a voice answering him, 'Anthony, keep your attention on yourself; these things are according to the judgement of God, and it is not to your advantage to know anything about them.'",
        title: "Trusting in the Judgements of God",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[0].id,
        createdBy: CREATED_BY_ID,
      },
      //2
      {
        body: "Someone asked Abba Anthony, 'What must one do in order to please God?' The old man replied, 'Pay attention to what I tell you: whoever you may be, always have God before your eyes; whatever you do, do it according to the testimony of the holy Scriptures; in whatever place you live, do not easily leave it. Keep these three precepts and you will be saved.'",
        title: "Pleasing God",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[0].id,
        createdBy: CREATED_BY_ID,
      },
    ];

    console.log("...Seed Concluding");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

main();
