import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DESERT_FIGURE_TITLE } from "../enums";
import {
  contentStatus,
  excerptDocument,
  NewContentStatus,
  NewUserRole,
  references,
  userRoles,
  DesertFigureDirectInsert,
  desertFigures,
  NewExcerpt,
  excerpts,
  NewTag,
  tags,
  NewExcerptTag,
  excerptTags,
  NewReference,
} from "./schema";
dotenv.config({ path: ".env.local" });

const TONY_ID = "b589d35a-fbd8-4a04-ad79-14fba097b930";
const MARIANNE_ID = "552db9ae-7788-4d6c-98ec-93a52b1d313b";

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  max: 1,
});
const db = drizzle(sql);

const main = async () => {
  try {
    console.log(
      "Clearing all statuses, excertps, desert figures, tags, tag excerpts",
    );

    await db.transaction(async (tx) => {
      await tx.delete(excerptTags);
      await tx.delete(tags);
      await tx.delete(excerpts);
      await tx.delete(references);
      await tx.delete(desertFigures);
      await tx.delete(contentStatus);
      console.log("Seed Comencing...");

      const USER_ROLES: NewUserRole[] = [
        {
          id: 1,
          name: "user",
        },
        {
          id: 2,
          name: "admin",
        },
      ];

      await tx.insert(userRoles).values(USER_ROLES).onConflictDoNothing();

      const CONTENT_STATUS: NewContentStatus[] = [
        {
          name: "Draft",
          description:
            "The user has created a draft that is still in the works.",
        },
        {
          name: "Pending",
          description:
            "The content was created and is awaiting approval for publication.",
        },
        {
          name: "Published",
          description:
            "This content has been approved and is live for all to see.",
        },
        {
          name: "Private",
          description:
            "This content has been marked as private meaning it can only be seen by the creator.",
        },
        {
          name: "Flagged",
          description:
            "This content has been flagged and may need to be taken down.",
        },
        {
          name: "Deleted",
          description:
            "This content has been removed from the site and no one can see it.",
        },
      ];

      const statuses = await tx
        .insert(contentStatus)
        .values(CONTENT_STATUS)
        .returning();

      const REFERENCE_SEED: NewReference[] = [
        {
          externalId: "/works/OL3102558W",
          title: "The Life of Antony",
          author: "Athanasius Saint, Patriarch of Alexandria",
          cover: "https://covers.openlibrary.org/b/id/1633331-M.jpg",
        },
        {
          externalId: "/works/OL17847207W",
          title: "The Sayings of the Desert Fathers",
          author: "Benedicta Ward",
          cover: "https://covers.openlibrary.org/b/id/8144807-M.jpg",
        },
      ];

      const DESERT_FIGURES_SEED: DesertFigureDirectInsert[] = [
        //0
        {
          title: DESERT_FIGURE_TITLE.SAINT,
          firstName: "Antony",
          epithet: "the Great",
          createdBy: TONY_ID,
          fullName: DESERT_FIGURE_TITLE.SAINT + " Antony the Great",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/st-antony-the-great.jpg",
        },
        //1
        {
          title: DESERT_FIGURE_TITLE.SAINT,
          firstName: "Macarius",
          epithet: "the Great",
          createdBy: TONY_ID,
          fullName: DESERT_FIGURE_TITLE.SAINT + " Macarius the Great",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/st-antony-the-great.jpg",
        },
        //2
        {
          title: DESERT_FIGURE_TITLE.SAINT,
          firstName: "Moses",
          epithet: "the Strong",
          createdBy: TONY_ID,
          fullName: DESERT_FIGURE_TITLE.SAINT + " Moses the Strong",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/st-macarius-the-great.jpg",
        },
        //3
        {
          title: DESERT_FIGURE_TITLE.SAINT,
          firstName: "John",
          epithet: "the Short",
          createdBy: TONY_ID,
          fullName: DESERT_FIGURE_TITLE.SAINT + " John the Short",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/st-john-the-short.jpg",
        },
        //4
        {
          title: DESERT_FIGURE_TITLE.SAINT,
          firstName: "Gregory",
          epithet: "the Theologian",
          createdBy: TONY_ID,
          fullName: DESERT_FIGURE_TITLE.SAINT + " Gregory the Theologian",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/st-gregory-the-theologian.jpg",
        },
        //5
        {
          title: DESERT_FIGURE_TITLE.FATHER,
          firstName: "Alexander",
          lastName: "Schmemann",
          createdBy: TONY_ID,
          fullName: DESERT_FIGURE_TITLE.FATHER + " Alexander Schmemann",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/Schmemann.png",
        },
        //6
        {
          title: DESERT_FIGURE_TITLE.FATHER,
          firstName: "Stephen",
          lastName: "Freeman",
          createdBy: TONY_ID,
          fullName: DESERT_FIGURE_TITLE.FATHER + " Stephen Freeman",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/fr-stephen-freeman.jpg",
        },
        //7
        {
          title: DESERT_FIGURE_TITLE.FATHER,
          firstName: "Thomas",
          lastName: "Merton",
          createdBy: MARIANNE_ID,
          fullName: DESERT_FIGURE_TITLE.FATHER + " Thomas Merton",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/Thomas-Merton.jpg",
        },
        //8
        {
          title: DESERT_FIGURE_TITLE.FATHER,
          firstName: "Kyrillos",
          lastName: "Ibrahim",
          createdBy: MARIANNE_ID,
          fullName: DESERT_FIGURE_TITLE.FATHER + " Kyrillos Ibrahim",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/fr-kyrillos-ibrahim.jpg",
        },
        //9
        {
          title: DESERT_FIGURE_TITLE.SAINT,
          firstName: "Clement",
          epithet: "of Rome",
          createdBy: MARIANNE_ID,
          fullName: DESERT_FIGURE_TITLE.SAINT + " Clement of Rome",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/st-clement-of-rome.jpg",
        },
        //10
        {
          title: DESERT_FIGURE_TITLE.SAINT,
          firstName: "Ignatius",
          epithet: "of Antioch",
          createdBy: MARIANNE_ID,
          fullName: DESERT_FIGURE_TITLE.SAINT + " Ignatius of Antioch",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/st-ignatius-of-antioch.jpg",
        },
        //11
        {
          title: DESERT_FIGURE_TITLE.SAINT,
          firstName: "Polycarp",
          epithet: "of Smyrna",
          createdBy: MARIANNE_ID,
          fullName: DESERT_FIGURE_TITLE.SAINT + " Polycarp of Smyrna",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/st-polycarp-of-smyrna.jpg",
        },
        //12
        {
          title: DESERT_FIGURE_TITLE.SAINT,
          firstName: "Justin",
          lastName: "Martyr",
          createdBy: MARIANNE_ID,
          fullName: DESERT_FIGURE_TITLE.SAINT + " Justin Martyr",
          statusId: statuses[2].id,
        },
        //13
        {
          title: DESERT_FIGURE_TITLE.SAINT,
          firstName: "Irenaeus",
          epithet: "of Lyon",
          createdBy: MARIANNE_ID,
          fullName: DESERT_FIGURE_TITLE.SAINT + " Irenaeus of Lyon",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/St.-Irenaeus.jpg",
        },
        //14
        {
          title: DESERT_FIGURE_TITLE.SAINT,
          firstName: "Porphyrios",
          epithet: "of Evia",
          createdBy: MARIANNE_ID,
          fullName: DESERT_FIGURE_TITLE.SAINT + " Porphyrios of Evia",
          statusId: statuses[2].id,
          thumbnail:
            "https://desert-collections-images.s3.us-west-1.amazonaws.com/saint_images/st-porphyrios-of-evia.jpg",
        },
      ];

      const authorIds = await tx
        .insert(desertFigures)
        .values(DESERT_FIGURES_SEED)
        .returning({ id: desertFigures.id });

      const EXCERPTS_SEED: NewExcerpt[] = [
        // St. Antony
        //0 tags -- boredom, dryness, spiritual struggle
        {
          body: "When the holy Abba Anthony lived in the desert he was beset by accidie (spiritual sloth), and attached by many sinful thoughts. He said to God, 'Lord, I want to be saved but these thoughts do not leave me alone; what shall I do in my affliction? How can I be saved?' A short while afterwards, when he got up to go out, Anthony saw a man like himself sitting down and plaiting a rope, then getting up again to pray. It was an angel of the Lord sent to correct and reassure him. He heard the angel saying to him, 'Do this and you will be saved.' At these words, Anthony was filled with joy and courage. He did this and he was saved.",
          title: "St. Antony Learns to Live in the Desert",
          desertFigureID: authorIds[0].id,
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        //1 tags -- trust, humility, doubt
        {
          body: "When the same Abba Anthony thought about the depth of the judgements of God, he asked, 'Lord, how is it that some die when they are young, while others drag on to extreme old age? Why are there those who are poor and those who are rich? Why do wicked men prosper and why are the just in need?' He heard a voice answering him, 'Anthony, keep your attention on yourself; these things are according to the judgement of God, and it is not to your advantage to know anything about them.'",
          title: "Trusting in the Judgements of God",
          desertFigureID: authorIds[0].id,
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        //2 tags -- pleasing God, presence of God, watchfullness
        {
          body: "Someone asked Abba Anthony, 'What must one do in order to please God?' The old man replied, 'Pay attention to what I tell you: whoever you may be, always have God before your eyes; whatever you do, do it according to the testimony of the holy Scriptures; in whatever place you live, do not easily leave it. Keep these three precepts and you will be saved.'",
          title: "Pleasing God",
          desertFigureID: authorIds[0].id,
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        //St. Macarius the Great
        // 3 tags -- vulnerability, confession, shame
        {
          body: "When Abba Macarius dwelt in the great desert, he was the only one living as an anchorite, but lower down there was another desert where several brothers dwelt. The old man was surveying the road when he saw Satan drawing near in the likeness of a man and he passed by his dwelling. He seemed to be wearing some kind of cotton garment, full of holes, and a small flask hung at each hole. The old man said to him, 'Where are you off to?' He said, 'I am going to stir up the memories of the brethren.'...The old man remained watching the road until he saw him coming back again. When the old man saw him, he said to him: 'Good health to you.' The other replied: 'How can I be in good health?' The old man asked him what he meant, and he replied, 'Because they all opposed me, and no one received me.' The old man said, 'Ah, you did not find any friends down there?' He replied, 'Yes, I have a monk who is a friend down there. He at least obeys me and when he sees me he changes like the wind.' The old man asked him the name of this monk. 'Theopemtus,' he replied. With these words he went away. Then Abba Macarius got up and went to the desert below his own. When they heard of it the brothers took branches of palm to go to meet him. Each one got ready, thinking that it was to him the old man was coming down. But he enquired which was the one on the mountain called Theopemptus, and when he had found out he went to his cell. Theopemptus received him with joy. When he was alone with him the old man asked him, 'How are you getting on?' Theopemptus replied, 'Thanks to your prayers, all goes well.' The old man asked: 'Do not your thoughts war against you?' He replied: 'Up to now, it is all right,' for he was afraid to admin anything. The old man said to him, 'See how many years I lived as an ascetic, and am praied by all, and though I am old, the spirit of fornication troubles me.' Theopemptus said, 'Believe me, abba, it is the same with me.' The old man went on admitting that other thoughts still warred against him, until he had brought him to admit them about himself. Then he said, 'How do you fast?' He replied, 'Till the ninth hour.' 'Practice fasting a little later; meditate on the Gospel and the other Scriptures, and if an alien thought arises within you, never look at it but always look upwards, and the Lord will come at once to your help.' When he had given the brother this rule, the old man then returned to his solitude. He was watching the road once more when he saw the devil, to whom he said, 'Where are you going this time?' He replied, 'To arouse the memories of the brothers,' and he went away. When he came back the saint asked him, 'How are the brothers?' He replied that it had gone badly. The old man asked him why. He replied, 'They are all obdurate, and the worst is the one friend I had who used to obey me. I do not know what has changed him, but not only does he not obey me any more, but he has become the most obdurate of them all.",
          title: "St. Macarius Helps One of the Brothers",
          desertFigureID: authorIds[1].id,
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        //4 tags -- 12 warfare, 13 deception
        {
          body: "A mother came here with her little child, posessed with a devil, who said to his mother, 'Get up woman, let us go away from here.' She replied, 'I cannot walk any futher,' and the little child said to her, 'I will carry you myself.' I wondered at the devil's tricks and how eager he was to make them flee.",
          title: "The Devil Wants To Turn Us Away",
          desertFigureID: authorIds[1].id,
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        //5 tags -- 14 love, 15 selfless, 16 gifts
        {
          body: "Abba Peter said that when Abba Macarius received all the brethren in simplicity, some of them asked him why he mixed with them like this. He replied, 'For twelve years I served the Lord, so that he might grant me this gift, and do you all advise me to give it up?'",
          title: "Abba Macarius loves the Brethren",
          desertFigureID: authorIds[1].id,
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // St. Moses the Strong
        // 6 tags -- 17 don't judge, 43 meekness, 4 humility
        {
          body: "A brother at Scetis commited a fault. A council was called which Abba Moses was invited, but he refused to go to it. Then the priest sent someone to say to him, 'Come, for everyone is waiting for you.' So he got up and went. He took a leaking jug, filled it with water and carried it with him. The others came out to meet him and said to him, 'What is this, Father?' The old man said to them, 'My sins run out behind me, and I do not see them, and today I am coming to judge the errors of another.' When they heard that they said no more to the brother but forgave him.",
          title: "Abba Moses Teaches Non-Judgement",
          desertFigureID: authorIds[2].id,
          statusId: statuses[2].id,
          createdBy: TONY_ID,
        },
        // 7 tags -- 18 priorities, 28 fasting, 19 hospitality
        {
          body: "Once the order was given at Scetis, 'Fast this week.' Now it happened that some brothers came from Egypt to visit Abba Moses and he cooked something for them. Seeing some smoke, the neighbours said to the ministers, 'Look, Moses has broken the commandment and has cooked something in his cell.' The ministers said, 'When he comes, we will speak to him ourselves.' When the Saturday came, since they know Abba Moses' remarkable way of life, the ministers said to him in front of everyone, 'O Abba Moses, you did not keep the commandment of men, but it was so that you might keep the commandment of God.'",
          title: "Abba Moses Puts Love First",
          desertFigureID: authorIds[2].id,
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 8 tags -- 20 wisdom, 21 stillness, 22 patience
        {
          body: "A brother came to Scetis to visit Abba Moses and asked him for a word. The old man said to him, 'Go, sit in your cell, and your cell will teach you everything.",
          title: "Your Cell Will Teach You Everything",
          desertFigureID: authorIds[2].id,
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // St. John the Short
        // 9 tags -- 23 obedience, 24 persistence, 25 discipleship
        {
          body: "It was said of Abba John the Dwarf that he withdrew and lived in the desert at Scetis with an old man of Thebes. His abba, taking a piece of dry wood, planted it and said to him, 'Water it every day with a bottle of water, until it bears fruit.' Now the water was so far away that he had to leave in the evening and return the following morning. At the end of three years the wood came to life and bore fruit. Then the old man took some of the fruit and arried it to the church saying to the brethren, 'Take and eat the fruit of obedience.'",
          title: "The Fruit of Obedience",
          desertFigureID: authorIds[3].id,
          statusId: statuses[2].id,
          createdBy: TONY_ID,
        },
        // 10 tags -- 4 humility, 26 zeal, 27 pride
        {
          body: "It was said of Abba John the Dwarf, that one day he said to his elder brother, 'I should like to be free of all care, like the angels, who do not work, but ceaselessly offer worship to God.' So he took off his cloak and went away into the desert. After a week he came back to his brother. When he knocked on the door, he heard his brother say, before he opened it 'Who are you?' He said, 'I am John, your brother.' But he replied, 'John has become an angel, and henceforth he is no longer among men.' Then the other begged him saying, 'It is I.' However, his brother did not let him in, but left him there in distress until morning. Then, pening the door, he said to him, 'You are a man and you must once again work in order to eat.' Then John made a prostration before him, saying, 'Forgive me.'",
          title: "Abba John Learns Humility",
          desertFigureID: authorIds[3].id,
          statusId: statuses[2].id,
          createdBy: TONY_ID,
        },
        // 11 tags -- 28 fasting, 29 passions, 2 struggle
        {
          body: "Abba John the Dwarf said, 'If a king wanted to take possession of his enemy's city, he would begin by cutting off the water and the food and so his enemies, dying of hunger, would submit to him. It is the same with the passions of the flesh: if a man goes about fasting and hungry the enemies of his soul grow weak.'",
          title: "Fasting Weakens The Passions",
          desertFigureID: authorIds[3].id,
          statusId: statuses[2].id,
          createdBy: TONY_ID,
        },
        // St. Gregory the Theologian
        // 12 tags -- 30 faith, 31 speak truth, 32 temperance
        {
          body: "Abba Gregory said, 'These three things God requires of all the baptized: right faith in the heart, truth on the tongue, temperance in the body.'",
          title: "Three Requirements",
          statusId: statuses[2].id,
          desertFigureID: authorIds[4].id,
          createdBy: TONY_ID,
        },
        // 13 tags -- 2 hard work, 33 desire
        {
          body: "Abba Gregory said, 'The whole life of a man is but one single day for those who are working hard with longing.'",
          title: "Life as One Day",
          statusId: statuses[2].id,
          desertFigureID: authorIds[4].id,
          createdBy: TONY_ID,
        },
        // Fr. Alexander Schmemann
        // 14 tags -- 34 eucharist, 35 priest, 36 communion
        {
          body: "The first, the basic definition of man is that he is the priest. He stands in the center of the world and unifies it in his act of blessing God, of both receiving the world from God and offering it to God--and by filling the world with this eucharist, he tranforms his life, the one that he receives from the world into life in God, into communion with him. The world was created as the 'matter,' the material of on all-embracing eucharist, and man was created as the priest of this cosmic sacrament.",
          statusId: statuses[2].id,
          title: "Man as Priest",
          desertFigureID: authorIds[5].id,
          createdBy: TONY_ID,
        },
        // 15 tags -- 37 the fall, 36 communion, 38 meaning
        {
          body: "It is not accidental, therefore, that the biblical story of the Fall is centered again on food. Man ate the forbidden fruit. The fruit of that one tree, whatever else it may signify, was unlike every other fruit in the Garden: it was not offered as a gift to man. Not given, not blessed by God, it was food whose eating was condemned to be communion with itself alone, and not with God. It is the image of the world loved for itself, and eating it is the image of life understood as an end in itself...He[man] forgets that the world, its air or its food cannot by themselves bring life, but only as they are received and accepted for God's sake, in God, and as bearers of the divine gift of life. By themselves they can produce only the appearance of life. When we see the world as an end in itself, everything becomes itself a value and consequently loses all value, because only in God is found the meaning(value) of everything, and the world is meaningful only when it is the 'sacrament' of God's presence. Things treated merely as things in themselves destroy themselves because only in God have they any life. The world of nature, cut off from the source of life is a dying world.",
          statusId: statuses[2].id,
          title: "The Fall as Living Life as an End In Itself",
          desertFigureID: authorIds[5].id,
          createdBy: TONY_ID,
        },
        // 16 tags -- 39 liturgy, 34 eucharist, 40 church
        {
          body: "The Eucharist is a liturgy. And he who says liturgy today is likely to get involved in a controversy. For to some--the 'liturgically minded'--of all the activities of the Church, liturgy is the most important, if not the only one. To others, liturgy is aesthetic, and a spiritual deviation from the real task of the Church. There exists today 'liturgical' and 'non-liturgical' churches and Christians. But this controversy is unnecessary, for it has its roots in one basic misunderstanding--the 'liturgical' understanding of liturgy. This is the reduction of the liturgy to 'cultic' categories, its definition as a sacred act of worship, different as such not only from the 'profane' area of life, but even from all other activies of the Church itself. But this is not the original meaning of the Greek word leitourgia. It meant an action by which a group of people become something corporately which they had not been as a mere collection of individuals--a whole greater than the sum of its parts...The Eucharist is the enterance of the Church into the joy of its Lord. And to enter into that joy, so as to be a witness to it in the world, is indeed the very calling of the Church, its essential leitourgia, the sacrament by which it 'becomes what it is.'",
          statusId: statuses[2].id,
          title: "A Proper Understanding of Liturgy",
          desertFigureID: authorIds[5].id,
          createdBy: TONY_ID,
        },
        // Fr. Stephen Freeman
        // 17 tags -- 11 shame, 41 identity, 33 seeking
        {
          body: "There is within us the very image of God: 'life and the kingdom...the treasures of grace.' If shame is part of our answer to the question, 'How do I feel about who I am?' this path reminds us that the truth of who I am is not found on the surface. Who I am is not to be mistaken for the 'garments of skin'-- the various strategies, identities, and designs with which we seek to clothe ourselves. The deepest mode of the spiritual life is one that searches for God, that asks, seeks, and knocks, in order to find the Kingdom. That is a search that takes us beneath layers of shame, beneath our false identities, into the very place where the image of God and the true self reside. This is a difficult journey.",
          title: "Who I Am Beyond Shame",
          desertFigureID: authorIds[6].id,
          statusId: statuses[2].id,
          createdBy: TONY_ID,
        },
        // 18 tags -- 11 shame, 41 identity, 42 healthy sexuality
        {
          body: "Speaking to adolescents, I have often used this imagery of the inner temple to help them understand the Church's teaching regarding sexual intimacy. There is a 'narthex' of the soul, our 'outer courtyard.' This most public part of our lives represents the face we show the world. It is a place of casual encounters, some of which bring joy, some of which we quickly reject. A few of the people we encounter in this way may be invited into friendship, into the 'inner courtyard' or 'nave' of the soul. That invitation is extended to those who can be trusted to value us, to respect the honor they have been given, and to acknowledge that they are guests here. We also have a 'holy place' that is our most intimate and delicate place. Into some portion of that place, we invite the most intimate of all human relationships--a spouse. The Church surrounds that relationship with rules and norms, not out of a fascination with a legalistic morality; instead, it is the deepest care of the soul that the Church seeks to guard. If this place is violated, particularly on a regular basis--as it is violated by sexual contact outside marriage--it begins to lose its ability to function. The result is a loss of the true self, an alientation from who we truly are, and an inability to find God. In plain terms, if the most intimate part of the soul is turned into the most public part of the soul, the mystery is trampled underfoot. We become lost. The darkness that results manifests itself in a myriad of ways, none of them healthy or life-giving.",
          title: "The Human as a Temple",
          desertFigureID: authorIds[6].id,
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 19 tags -- 4 humility, 14 love, 45 prayer
        {
          body: "Only the Holy Spirit, only the grace of God, can inspire the Jesus Prayer. It's not difficult to repeat the words, but you cannot pray it properly because your old fallen self rebuffs it. Unless you enter into the atmosphere of grace, you will not be able to say the prayer. As soon as you hear an offensive word are you grieved? And as soon as you hear something complimentary are you pleased? That shows that you are not ready, that you do not yet have what is required. For divine grce to come you must acquire the prerequisites: love and humility.",
          title: "Only the Holy Spirit Can Teach Us to Pray",
          desertFigureID: authorIds[14].id,
          createdBy: MARIANNE_ID,
          statusId: statuses[2].id,
        },
        // 20 tags -- 15 selfless, 45 prayer
        {
          body: "In our prayer we should ask only for the salvation of our soul. Didn't the Lord say, Seek first the Kingdom of God, and all these things will be added to you? Easily, without the slightest difficulty, Christ can give us what we want. And remember the secret. The secret is not to think about asking for the specific thing at all. The secret is to ask for your union with Christ with utter selflessness.",
          title: "Ask for the Salvation of your Soul",
          desertFigureID: authorIds[14].id,
          createdBy: MARIANNE_ID,
          statusId: statuses[2].id,
        },
      ];

      const excerptIds = await tx
        .insert(excerpts)
        .values(EXCERPTS_SEED)
        .returning({ id: excerpts.id });

      const TAGS_SEED: NewTag[] = [
        // 0
        {
          name: "boredom",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 1
        {
          name: "dryness",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 2
        {
          name: "spiritual struggle",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 3
        {
          name: "trust",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 4
        {
          name: "humility",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 5
        {
          name: "doubt",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 6
        {
          name: "pleasing God",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 7
        {
          name: "presence of God",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 8
        {
          name: "watchfullness",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 9
        {
          name: "vulnerability",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 10
        {
          name: "confession",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 11
        {
          name: "shame",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 12
        {
          name: "warfare",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 13
        {
          name: "deception",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 14
        {
          name: "love",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 15
        {
          name: "selfless",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 16
        {
          name: "gifts",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 17
        {
          name: "do not judge",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 18
        {
          name: "priorities",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 19
        {
          name: "hospitality",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 20
        {
          name: "wisdom",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 21
        {
          name: "stillness",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 22
        {
          name: "patience",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 23
        {
          name: "obedience",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 24
        {
          name: "persistence",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 25
        {
          name: "discipleship",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 26
        {
          name: "zeal",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 27
        {
          name: "pride",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 28
        {
          name: "fasting",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 29
        {
          name: "passions",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 30
        {
          name: "faith",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 31
        {
          name: "speak truth",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 32
        {
          name: "temperance",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 33
        {
          name: "longing",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 34
        {
          name: "eucharist",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 35
        {
          name: "priest",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 36
        {
          name: "communion",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 37
        {
          name: "the fall",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 38
        {
          name: "meaning",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 39
        {
          name: "liturgy",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 40
        {
          name: "church",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 41
        {
          name: "identity",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 42
        {
          name: "healthy sexuality",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 43
        {
          name: "meekness",
          createdBy: TONY_ID,
          statusId: statuses[2].id,
        },
        // 44
        {
          name: "holiness",
          createdBy: TONY_ID,
          statusId: statuses[1].id,
        },
        // 45
        {
          name: "prayer",
          createdBy: MARIANNE_ID,
          statusId: statuses[2].id,
        },
      ];

      const tagIds = await tx
        .insert(tags)
        .values(TAGS_SEED)
        .returning({ id: tags.id });

      const EXCERPT_TAG_SEED: NewExcerptTag[] = [
        {
          excerptId: excerptIds[0].id,
          tagId: tagIds[0].id,
        },
        {
          excerptId: excerptIds[0].id,
          tagId: tagIds[1].id,
        },
        {
          excerptId: excerptIds[0].id,
          tagId: tagIds[2].id,
        },
        {
          excerptId: excerptIds[1].id,
          tagId: tagIds[3].id,
        },
        {
          excerptId: excerptIds[1].id,
          tagId: tagIds[4].id,
        },
        {
          excerptId: excerptIds[1].id,
          tagId: tagIds[5].id,
        },
        {
          excerptId: excerptIds[2].id,
          tagId: tagIds[6].id,
        },
        {
          excerptId: excerptIds[2].id,
          tagId: tagIds[7].id,
        },
        {
          excerptId: excerptIds[2].id,
          tagId: tagIds[8].id,
        },
        {
          excerptId: excerptIds[3].id,
          tagId: tagIds[9].id,
        },
        {
          excerptId: excerptIds[3].id,
          tagId: tagIds[10].id,
        },
        {
          excerptId: excerptIds[3].id,
          tagId: tagIds[11].id,
        },
        {
          excerptId: excerptIds[4].id,
          tagId: tagIds[12].id,
        },
        {
          excerptId: excerptIds[4].id,
          tagId: tagIds[13].id,
        },
        {
          excerptId: excerptIds[5].id,
          tagId: tagIds[14].id,
        },
        {
          excerptId: excerptIds[5].id,
          tagId: tagIds[15].id,
        },
        {
          excerptId: excerptIds[5].id,
          tagId: tagIds[16].id,
        },
        {
          excerptId: excerptIds[6].id,
          tagId: tagIds[17].id,
        },
        {
          excerptId: excerptIds[6].id,
          tagId: tagIds[43].id,
        },
        {
          excerptId: excerptIds[6].id,
          tagId: tagIds[4].id,
        },
        {
          excerptId: excerptIds[7].id,
          tagId: tagIds[18].id,
        },
        {
          excerptId: excerptIds[7].id,
          tagId: tagIds[28].id,
        },
        {
          excerptId: excerptIds[7].id,
          tagId: tagIds[19].id,
        },
        {
          excerptId: excerptIds[8].id,
          tagId: tagIds[20].id,
        },
        {
          excerptId: excerptIds[8].id,
          tagId: tagIds[21].id,
        },
        {
          excerptId: excerptIds[8].id,
          tagId: tagIds[22].id,
        },
        {
          excerptId: excerptIds[9].id,
          tagId: tagIds[23].id,
        },
        {
          excerptId: excerptIds[9].id,
          tagId: tagIds[24].id,
        },
        {
          excerptId: excerptIds[9].id,
          tagId: tagIds[25].id,
        },
        {
          excerptId: excerptIds[10].id,
          tagId: tagIds[4].id,
        },
        {
          excerptId: excerptIds[10].id,
          tagId: tagIds[26].id,
        },
        {
          excerptId: excerptIds[10].id,
          tagId: tagIds[27].id,
        },
        {
          excerptId: excerptIds[11].id,
          tagId: tagIds[28].id,
        },
        {
          excerptId: excerptIds[11].id,
          tagId: tagIds[29].id,
        },
        {
          excerptId: excerptIds[11].id,
          tagId: tagIds[2].id,
        },
        {
          excerptId: excerptIds[12].id,
          tagId: tagIds[30].id,
        },
        {
          excerptId: excerptIds[12].id,
          tagId: tagIds[31].id,
        },
        {
          excerptId: excerptIds[12].id,
          tagId: tagIds[32].id,
        },
        {
          excerptId: excerptIds[13].id,
          tagId: tagIds[2].id,
        },
        {
          excerptId: excerptIds[13].id,
          tagId: tagIds[33].id,
        },
        {
          excerptId: excerptIds[14].id,
          tagId: tagIds[34].id,
        },
        {
          excerptId: excerptIds[14].id,
          tagId: tagIds[35].id,
        },
        {
          excerptId: excerptIds[14].id,
          tagId: tagIds[36].id,
        },
        {
          excerptId: excerptIds[15].id,
          tagId: tagIds[37].id,
        },
        {
          excerptId: excerptIds[15].id,
          tagId: tagIds[36].id,
        },
        {
          excerptId: excerptIds[15].id,
          tagId: tagIds[38].id,
        },
        {
          excerptId: excerptIds[16].id,
          tagId: tagIds[39].id,
        },
        {
          excerptId: excerptIds[16].id,
          tagId: tagIds[34].id,
        },
        {
          excerptId: excerptIds[16].id,
          tagId: tagIds[40].id,
        },
        {
          excerptId: excerptIds[17].id,
          tagId: tagIds[11].id,
        },
        {
          excerptId: excerptIds[17].id,
          tagId: tagIds[41].id,
        },
        {
          excerptId: excerptIds[17].id,
          tagId: tagIds[33].id,
        },
        {
          excerptId: excerptIds[18].id,
          tagId: tagIds[11].id,
        },
        {
          excerptId: excerptIds[18].id,
          tagId: tagIds[41].id,
        },
        {
          excerptId: excerptIds[18].id,
          tagId: tagIds[42].id,
        },
        {
          excerptId: excerptIds[19].id,
          tagId: tagIds[4].id,
        },
        {
          excerptId: excerptIds[19].id,
          tagId: tagIds[14].id,
        },
        {
          excerptId: excerptIds[19].id,
          tagId: tagIds[45].id,
        },
        {
          excerptId: excerptIds[20].id,
          tagId: tagIds[15].id,
        },
        {
          excerptId: excerptIds[20].id,
          tagId: tagIds[45].id,
        },
      ];

      await tx.insert(excerptTags).values(EXCERPT_TAG_SEED);

      // refresh views post seed
      console.log("---> Refreshing Views");
      await tx.refreshMaterializedView(excerptDocument);

      console.log("...Seed Concluding");
    });
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

main();
