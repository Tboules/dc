import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { NewDesertFigure, desertFigures } from "./schema/desertFigures";
import { DESERT_FIGURE_TITLE } from "../enums";
import { NewExcerpt, excerpts } from "./schema/excerpts";
import { NewTag } from "./schema/tags";
dotenv.config({ path: ".env.local" });

const CREATED_BY_ID = "d53d1855-14fa-4365-bb51-f30b29d28506";
const BOOK_REFERENCES = {
  paradiseOfTheFathers: "The Sayings of the Desert Fathers",
  forTheLifeOfTheWorld: "For the Life of the World",
  faceToFace: "Face to Face: Knowing God Beyond Our Shame",
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
        firstName: "John",
        epithet: "the Short",
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
      // 3 tags -- vulnerability, confession, shame
      {
        body: "When Abba Macarius dwelt in the great desert, he was the only one living as an anchorite, but lower down there was another desert where several brothers dwelt. The old man was surveying the road when he saw Satan drawing near in the likeness of a man and he passed by his dwelling. He seemed to be wearing some kind of cotton garment, full of holes, and a small flask hung at each hole. The old man said to him, 'Where are you off to?' He said, 'I am going to stir up the memories of the brethren.'...The old man remained watching the road until he saw him coming back again. When the old man saw him, he said to him: 'Good health to you.' The other replied: 'How can I be in good health?' The old man asked him what he meant, and he replied, 'Because they all opposed me, and no one received me.' The old man said, 'Ah, you did not find any friends down there?' He replied, 'Yes, I have a monk who is a friend down there. He at least obeys me and when he sees me he changes like the wind.' The old man asked him the name of this monk. 'Theopemtus,' he replied. With these words he went away. Then Abba Macarius got up and went to the desert below his own. When they heard of it the brothers took branches of palm to go to meet him. Each one got ready, thinking that it was to him the old man was coming down. But he enquired which was the one on the mountain called Theopemptus, and when he had found out he went to his cell. Theopemptus received him with joy. When he was alone with him the old man asked him, 'How are you getting on?' Theopemptus replied, 'Thanks to your prayers, all goes well.' The old man asked: 'Do not your thoughts war against you?' He replied: 'Up to now, it is all right,' for he was afraid to admin anything. The old man said to him, 'See how many years I lived as an ascetic, and am praied by all, and though I am old, the spirit of fornication troubles me.' Theopemptus said, 'Believe me, abba, it is the same with me.' The old man went on admitting that other thoughts still warred against him, until he had brought him to admit them about himself. Then he said, 'How do you fast?' He replied, 'Till the ninth hour.' 'Practice fasting a little later; meditate on the Gospel and the other Scriptures, and if an alien thought arises within you, never look at it but always look upwards, and the Lord will come at once to your help.' When he had given the brother this rule, the old man then returned to his solitude. He was watching the road once more when he saw the devil, to whom he said, 'Where are you going this time?' He replied, 'To arouse the memories of the brothers,' and he went away. When he came back the saint asked him, 'How are the brothers?' He replied that it had gone badly. The old man asked him why. He replied, 'They are all obdurate, and the worst is the one friend I had who used to obey me. I do not know what has changed him, but not only does he not obey me any more, but he has become the most obdurate of them all.",
        title: "St. Macarius Helps One of the Brothers",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[1].id,
        createdBy: CREATED_BY_ID,
      },
      //4 tags -- warfare, deception
      {
        body: "A mother came here with her little child, posessed with a devil, who said to his mother, 'Get up woman, let us go away from here.' She replied, 'I cannot walk any futher,' and the little child said to her, 'I will carry you myself.' I wondered at the devil's tricks and how eager he was to make them flee.",
        title: "The Devil Wants To Turn Us Away",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[1].id,
        createdBy: CREATED_BY_ID,
      },
      //5 tags -- love, selfless, gifts
      {
        body: "Abba Peter said that when Abba Macarius received all the brethren in simplicity, some of them asked him why he mixed with them like this. He replied, 'For twelve years I served the Lord, so that he might grant me this gift, and do you all advise me to give it up?'",
        title: "Abba Macarius loves the Brethren",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[1].id,
        createdBy: CREATED_BY_ID,
      },
      // St. Moses the Strong
      // 6 tags -- don't judge, meekness, humility
      {
        body: "A brother at Scetis commited a fault. A council was called which Abba Moses was invited, but he refused to go to it. Then the priest sent someone to say to him, 'Come, for everyone is waiting for you.' So he got up and went. He took a leaking jug, filled it with water and carried it with him. The others came out to meet him and said to him, 'What is this, Father?' The old man said to them, 'My sins run out behind me, and I do not see them, and today I am coming to judge the errors of another.' When they heard that they said no more to the brother but forgave him.",
        title: "Abba Moses Teaches Non-Judgement",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[2].id,
        createdBy: CREATED_BY_ID,
      },
      // 7 tags -- priorities, fasting, hospitality
      {
        body: "Once the order was given at Scetis, 'Fast this week.' Now it happened that some brothers came from Egypt to visit Abba Moses and he cooked something for them. Seeing some smoke, the neighbours said to the ministers, 'Look, Moses has broken the commandment and has cooked something in his cell.' The ministers said, 'When he comes, we will speak to him ourselves.' When the Saturday came, since they know Abba Moses' remarkable way of life, the ministers said to him in front of everyone, 'O Abba Moses, you did not keep the commandment of men, but it was so that you might keep the commandment of God.'",
        title: "Abba Moses Puts Love First",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[2].id,
        createdBy: CREATED_BY_ID,
      },
      // 8 tags -- wisdom, stillness, patience
      {
        body: "A brother came to Scetis to visit Abba Moses and asked him for a word. The old man said to him, 'Go, sit in your cell, and your cell will teach you everything.",
        title: "Your Cell Will Teach You Everything",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[2].id,
        createdBy: CREATED_BY_ID,
      },
      // St. John the Short
      // 9 tags -- obedience, persistence, discipleship
      {
        body: "It was said of Abba John the Dwarf that he withdrew and lived in the desert at Scetis with an old man of Thebes. His abba, taking a piece of dry wood, planted it and said to him, 'Water it every day with a bottle of water, until it bears fruit.' Now the water was so far away that he had to leave in the evening and return the following morning. At the end of three years the wood came to life and bore fruit. Then the old man took some of the fruit and arried it to the church saying to the brethren, 'Take and eat the fruit of obedience.'",
        title: "The Fruit of Obedience",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[3].id,
        createdBy: CREATED_BY_ID,
      },
      // 10 tags -- humility, zeal, pride
      {
        body: "It was said of Abba John the Dwarf, that one day he said to his elder brother, 'I should like to be free of all care, like the angels, who do not work, but ceaselessly offer worship to God.' So he took off his cloak and went away into the desert. After a week he came back to his brother. When he knocked on the door, he heard his brother say, before he opened it 'Who are you?' He said, 'I am John, your brother.' But he replied, 'John has become an angel, and henceforth he is no longer among men.' Then the other begged him saying, 'It is I.' However, his brother did not let him in, but left him there in distress until morning. Then, pening the door, he said to him, 'You are a man and you must once again work in order to eat.' Then John made a prostration before him, saying, 'Forgive me.'",
        title: "Abba John Learns Humility",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[3].id,
        createdBy: CREATED_BY_ID,
      },
      // 11 tags -- fasting, passions, struggle
      {
        body: "Abba John the Dwarf said, 'If a king wanted to take possession of his enemy's city, he would begin by cutting off the water and the food and so his enemies, dying of hunger, would submit to him. It is the same with the passions of the flesh: if a man goes about fasting and hungry the enemies of his soul grow weak.'",
        title: "Fasting Weakens The Passions",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[3].id,
        createdBy: CREATED_BY_ID,
      },
      // St. Gregory the Theologian
      // 12 tags -- faith, speak truth, temperance
      {
        body: "Abba Gregory said, 'These three things God requires of all the baptized: right faith in the heart, truth on the tongue, temperance in the body.'",
        title: "Three Requirements",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[4].id,
        createdBy: CREATED_BY_ID,
      },
      // 13 tags -- hard work, desire
      {
        body: "Abba Gregory said, 'The whole life of a man is but one single day for those who are working hard with longing.'",
        title: "Life as One Day",
        reference: BOOK_REFERENCES.paradiseOfTheFathers,
        desertFigureID: authorIds[4].id,
        createdBy: CREATED_BY_ID,
      },
      // Fr. Alexander Schmemann
      // 14 tags -- eucharist, priest, communion
      {
        body: "The first, the basic definition of man is that he is the priest. He stands in the center of the world and unifies it in his act of blessing God, of both receiving the world from God and offering it to God--and by filling the world with this eucharist, he tranforms his life, the one that he receives from the world into life in God, into communion with him. The world was created as the 'matter,' the material of on all-embracing eucharist, and man was created as the priest of this cosmic sacrament.",
        title: "Man as Priest",
        reference: BOOK_REFERENCES.forTheLifeOfTheWorld,
        desertFigureID: authorIds[5].id,
        createdBy: CREATED_BY_ID,
      },
      // 15 tags -- the fall, communion, meaning
      {
        body: "It is not accidental, therefore, that the biblical story of the Fall is centered again on food. Man ate the forbidden fruit. The fruit of that one tree, whatever else it may signify, was unlike every other fruit in the Garden: it was not offered as a gift to man. Not given, not blessed by God, it was food whose eating was condemned to be communion with itself alone, and not with God. It is the image of the world loved for itself, and eating it is the image of life understood as an end in itself...He[man] forgets that the world, its air or its food cannot by themselves bring life, but only as they are received and accepted for God's sake, in God, and as bearers of the divine gift of life. By themselves they can produce only the appearance of life. When we see the world as an end in itself, everything becomes itself a value and consequently loses all value, because only in God is found the meaning(value) of everything, and the world is meaningful only when it is the 'sacrament' of God's presence. Things treated merely as things in themselves destroy themselves because only in God have they any life. The world of nature, cut off from the source of life is a dying world.",
        title: "The Fall as Living Life as an End In Itself",
        reference: BOOK_REFERENCES.forTheLifeOfTheWorld,
        desertFigureID: authorIds[5].id,
        createdBy: CREATED_BY_ID,
      },
      // 16 tags -- liturgy, eucharist, church
      {
        body: "The Eucharist is a liturgy. And he who says liturgy today is likely to get involved in a controversy. For to some--the 'liturgically minded'--of all the activities of the Church, liturgy is the most important, if not the only one. To others, liturgy is aesthetic, and a spiritual deviation from the real task of the Church. There exists today 'liturgical' and 'non-liturgical' churches and Christians. But this controversy is unnecessary, for it has its roots in one basic misunderstanding--the 'liturgical' understanding of liturgy. This is the reduction of the liturgy to 'cultic' categories, its definition as a sacred act of worship, different as such not only from the 'profane' area of life, but even from all other activies of the Church itself. But this is not the original meaning of the Greek word leitourgia. It meant an action by which a group of people become something corporately which they had not been as a mere collection of individuals--a whole greater than the sum of its parts...The Eucharist is the enterance of the Church into the joy of its Lord. And to enter into that joy, so as to be a witness to it in the world, is indeed the very calling of the Church, its essential leitourgia, the sacrament by which it 'becomes what it is.'",
        title: "A Proper Understanding of Liturgy",
        reference: BOOK_REFERENCES.forTheLifeOfTheWorld,
        desertFigureID: authorIds[5].id,
        createdBy: CREATED_BY_ID,
      },
      // Fr. Stephen Freeman
      // 17 tags -- shame, identity, seeking
      {
        body: "There is within us the very image of God: 'life and the kingdom...the treasures of grace.' If shame is part of our answer to the question, 'How do I feel about who I am?' this path reminds us that the truth of who I am is not found on the surface. Who I am is not to be mistaken for the 'garments of skin'-- the various strategies, identities, and designs with which we seek to clothe ourselves. The deepest mode of the spiritual life is one that searches for God, that asks, seeks, and knocks, in order to find the Kingdom. That is a search that takes us beneath layers of shame, beneath our false identities, into the very place where the image of God and the true self reside. This is a difficult journey.",
        title: "Who I Am Beyond Shame",
        reference: BOOK_REFERENCES.faceToFace,
        desertFigureID: authorIds[6].id,
        createdBy: CREATED_BY_ID,
      },
      // 18 tags -- shame, identity, healthy sexuality
      {
        body: "Speaking to adolescents, I have often used this imagery of the inner temple to help them understand the Church's teaching regarding sexual intimacy. There is a 'narthex' of the soul, our 'outer courtyard.' This most public part of our lives represents the face we show the world. It is a place of casual encounters, some of which bring joy, some of which we quickly reject. A few of the people we encounter in this way may be invited into friendship, into the 'inner courtyard' or 'nave' of the soul. That invitation is extended to those who can be trusted to value us, to respect the honor they have been given, and to acknowledge that they are guests here. We also have a 'holy place' that is our most intimate and delicate place. Into some portion of that place, we invite the most intimate of all human relationships--a spouse. The Church surrounds that relationship with rules and norms, not out of a fascination with a legalistic morality; instead, it is the deepest care of the soul that the Church seeks to guard. If this place is violated, particularly on a regular basis--as it is violated by sexual contact outside marriage--it begins to lose its ability to function. The result is a loss of the true self, an alientation from who we truly are, and an inability to find God. In plain terms, if the most intimate part of the soul is turned into the most public part of the soul, the mystery is trampled underfoot. We become lost. The darkness that results manifests itself in a myriad of ways, none of them healthy or life-giving.",
        title: "The Human as a Temple",
        reference: BOOK_REFERENCES.faceToFace,
        desertFigureID: authorIds[6].id,
        createdBy: CREATED_BY_ID,
      },
    ];

    const excerptIds = await db
      .insert(excerpts)
      .values(EXCERPTS_SEED)
      .returning({ id: excerpts.id });

    const TAGS_SEED: NewTag[] = [
      // 0
      {
        name: "boredom",
        createdBy: CREATED_BY_ID,
      },
      // 1
      {
        name: "dryness",
        createdBy: CREATED_BY_ID,
      },
      // 2
      {
        name: "spiritual struggle",
        createdBy: CREATED_BY_ID,
      },
      // 3
      {
        name: "trust",
        createdBy: CREATED_BY_ID,
      },
      // 4
      {
        name: "humility",
        createdBy: CREATED_BY_ID,
      },
      // 5
      {
        name: "doubt",
        createdBy: CREATED_BY_ID,
      },
      // 6
      {
        name: "pleasing God",
        createdBy: CREATED_BY_ID,
      },
      // 7
      {
        name: "presence of God",
        createdBy: CREATED_BY_ID,
      },
      // 8
      {
        name: "watchfullness",
        createdBy: CREATED_BY_ID,
      },
      // 9
      {
        name: "vulnerability",
        createdBy: CREATED_BY_ID,
      },
      // 10
      {
        name: "confession",
        createdBy: CREATED_BY_ID,
      },
      // 11
      {
        name: "shame",
        createdBy: CREATED_BY_ID,
      },
      // 12
      {
        name: "warfare",
        createdBy: CREATED_BY_ID,
      },
      // 13
      {
        name: "deception",
        createdBy: CREATED_BY_ID,
      },
      // 14
      {
        name: "love",
        createdBy: CREATED_BY_ID,
      },
      // 15
      {
        name: "selfless",
        createdBy: CREATED_BY_ID,
      },
      // 16
      {
        name: "gifts",
        createdBy: CREATED_BY_ID,
      },
      // 17
      {
        name: "do not judge",
        createdBy: CREATED_BY_ID,
      },
      // 18
      {
        name: "priorities",
        createdBy: CREATED_BY_ID,
      },
      // 19
      {
        name: "hospitality",
        createdBy: CREATED_BY_ID,
      },
      // 20
      {
        name: "wisdom",
        createdBy: CREATED_BY_ID,
      },
      // 21
      {
        name: "stillness",
        createdBy: CREATED_BY_ID,
      },
      // 22
      {
        name: "patience",
        createdBy: CREATED_BY_ID,
      },
      // 23
      {
        name: "obedience",
        createdBy: CREATED_BY_ID,
      },
      // 24
      {
        name: "persistence",
        createdBy: CREATED_BY_ID,
      },
      // 25
      {
        name: "discipleship",
        createdBy: CREATED_BY_ID,
      },
      // 26
      {
        name: "zeal",
        createdBy: CREATED_BY_ID,
      },
      // 27
      {
        name: "pride",
        createdBy: CREATED_BY_ID,
      },
      // 28
      {
        name: "fasting",
        createdBy: CREATED_BY_ID,
      },
      // 29
      {
        name: "passions",
        createdBy: CREATED_BY_ID,
      },
      // 30
      {
        name: "faith",
        createdBy: CREATED_BY_ID,
      },
      // 31
      {
        name: "speak truth",
        createdBy: CREATED_BY_ID,
      },
      // 32
      {
        name: "temperance",
        createdBy: CREATED_BY_ID,
      },
      // 33
      {
        name: "longing",
        createdBy: CREATED_BY_ID,
      },
      // 34
      {
        name: "eucharist",
        createdBy: CREATED_BY_ID,
      },
      // 35
      {
        name: "priest",
        createdBy: CREATED_BY_ID,
      },
      // 36
      {
        name: "communion",
        createdBy: CREATED_BY_ID,
      },
      // 37
      {
        name: "the fall",
        createdBy: CREATED_BY_ID,
      },
      // 38
      {
        name: "meaning",
        createdBy: CREATED_BY_ID,
      },
      // 39
      {
        name: "liturgy",
        createdBy: CREATED_BY_ID,
      },
      // 40
      {
        name: "church",
        createdBy: CREATED_BY_ID,
      },
      // 41
      {
        name: "identity",
        createdBy: CREATED_BY_ID,
      },
      // 42
      {
        name: "healthy sexuality",
        createdBy: CREATED_BY_ID,
      },
    ];

    console.log(excerptIds);

    console.log("...Seed Concluding");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

main();
