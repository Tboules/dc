import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { NewDesertFigure, desertFigures } from "./schema/desertFigures";
import { DESERT_FIGURE_TITLE } from "../enums";
import { NewExcerpt, excerpts } from "./schema/excerpts";
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
      // St. Antony
      //0 tags -- boredom, dryness, spiritual struggle
      {
        body: "When the holy Abba Anthony lived in the desert he was beset by accidie (spiritual sloth), and attached by many sinful thoughts. He said to God, 'Lord, I want to be saved but these thoughts do not leave me alone; what shall I do in my affliction? How can I be saved?' A short while afterwards, when he got up to go out, Anthony saw a man like himself sitting down and plaiting a rope, then getting up again to pray. It was an angel of the Lord sent to correct and reassure him. He heard the angel saying to him, 'Do this and you will be saved.' At these words, Anthony was filled with joy and courage. He did this and he was saved.",
        title: "St. Antony Learns to Live in the Desert",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[0].id,
        createdBy: CREATED_BY_ID,
      },
      //1 tags -- trust, humility, doubt
      {
        body: "When the same Abba Anthony thought about the depth of the judgements of God, he asked, 'Lord, how is it that some die when they are young, while others drag on to extreme old age? Why are there those who are poor and those who are rich? Why do wicked men prosper and why are the just in need?' He heard a voice answering him, 'Anthony, keep your attention on yourself; these things are according to the judgement of God, and it is not to your advantage to know anything about them.'",
        title: "Trusting in the Judgements of God",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[0].id,
        createdBy: CREATED_BY_ID,
      },
      //2 tags -- pleasing God, presence of God, watchfullness
      {
        body: "Someone asked Abba Anthony, 'What must one do in order to please God?' The old man replied, 'Pay attention to what I tell you: whoever you may be, always have God before your eyes; whatever you do, do it according to the testimony of the holy Scriptures; in whatever place you live, do not easily leave it. Keep these three precepts and you will be saved.'",
        title: "Pleasing God",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[0].id,
        createdBy: CREATED_BY_ID,
      },
      //St. Macarius the Great
      // 3 tags --
      {
        body: "When Abba Macarius dwelt in the great desert, he was the only one living as an anchorite, but lower down there was another desert where several brothers dwelt. The old man was surveying the road when he saw Satan drawing near in the likeness of a man and he passed by his dwelling. He seemed to be wearing some kind of cotton garment, full of holes, and a small flask hung at each hole. The old man said to him, 'Where are you off to?' He said, 'I am going to stir up the memories of the brethren.'...The old man remained watching the road until he saw him coming back again. When the old man saw him, he said to him: 'Good health to you.' The other replied: 'How can I be in good health?' The old man asked him what he meant, and he replied, 'Because they all opposed me, and no one received me.' The old man said, 'Ah, you did not find any friends down there?' He replied, 'Yes, I have a monk who is a friend down there. He at least obeys me and when he sees me he changes like the wind.' The old man asked him the name of this monk. 'Theopemtus,' he replied. With these words he went away. Then Abba Macarius got up and went to the desert below his own. When they heard of it the brothers took branches of palm to go to meet him. Each one got ready, thinking that it was to him the old man was coming down. But he enquired which was the one on the mountain called Theopemptus, and when he had found out he went to his cell. Theopemptus received him with joy. When he was alone with him the old man asked him, 'How are you getting on?' Theopemptus replied, 'Thanks to your prayers, all goes well.' The old man asked: 'Do not your thoughts war against you?' He replied: 'Up to now, it is all right,' for he was afraid to admin anything. The old man said to him, 'See how many years I lived as an ascetic, and am praied by all, and though I am old, the spirit of fornication troubles me.' Theopemptus said, 'Believe me, abba, it is the same with me.' The old man went on admitting that other thoughts still warred against him, until he had brought him to admit them about himself. Then he said, 'How do you fast?' He replied, 'Till the ninth hour.' 'Practice fasting a little later; meditate on the Gospel and the other Scriptures, and if an alien thought arises within you, never look at it but always look upwards, and the Lord will come at once to your help.' When he had given the brother this rule, the old man then returned to his solitude. He was watching the road once more when he saw the devil, to whom he said, 'Where are you going this time?' He replied, 'To arouse the memories of the brothers,' and he went away. When he came back the saint asked him, 'How are the brothers?' He replied that it had gone badly. The old man asked him why. He replied, 'They are all obdurate, and the worst is the one friend I had who used to obey me. I do not know what has changed him, but not only does he not obey me any more, but he has become the most obdurate of them all.",
        title: "St. Macarius Helps One of the Brothers",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[1].id,
        createdBy: CREATED_BY_ID,
      },
      {
        body: "",
        title: "",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[1].id,
        createdBy: CREATED_BY_ID,
      },
      {
        body: "",
        title: "",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[1].id,
        createdBy: CREATED_BY_ID,
      },
      // St. Moses the Strong
      // St. Basil the Great
      // St. Gregory the Theologian
      // Fr. Alexander Schmemann
      // Fr. Stephen Freeman
    ];

    const excerptIds = await db
      .insert(excerpts)
      .values(EXCERPTS_SEED)
      .returning({ id: excerpts.id });

    console.log(excerptIds);

    console.log("...Seed Concluding");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

main();
