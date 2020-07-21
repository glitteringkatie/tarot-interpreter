const natural = require("natural");

const language = "EN";
const defaultCategory = "N";
const defaultCategoryCapitalized = "NNP";

const lexicon = new natural.Lexicon(
  language,
  defaultCategory,
  defaultCategoryCapitalized
);
const ruleSet = new natural.RuleSet(language);
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

var tokenizer = new natural.TreebankWordTokenizer();
const sentence =
  "The Fool is a card of new beginnings, opportunity and potential. Just like the young man, you are at the outset of your journey, standing at the cliff‘s edge, and about to take your first step into the unknown. Even though you don’t know exactly where you are going, you are being called to commit yourself and follow your heart, no matter how crazy this leap of faith might seem to you. Now is a time when you need to trust where the Universe is taking you. As you undertake this new journey, the Fool encourages you to have an open, curious mind and a sense of excitement. Throw caution to the wind and be ready to embrace the unknown, leaving behind any fear, worry or anxiety about what may or may not happen. This is about new experiences, personal growth, development, and adventure. The time is NOW! Take that leap of faith, even if you do not feel 100% ready or equipped for what is coming (who knows what it could be?!). Seriously, what are you waiting for? Do you think you need to have everything mapped out before you can begin? No way! Not with the Fool. He ventures out on his journey with just his essential belongings – and now he invites you to do the same. You don’t need to wait for someone to give you the green light or hold off until you have all the skills, tools and resources you think you might need. You are ready! If you’ve been watching for a sign, this is it! This is a time of great potential and opportunity for you right now. The world is your oyster, and anything can happen. Use your creative mind with a dash of spontaneity to make the most of this magical time and bring forth your new ideas in powerful ways. The Fool is your invitation to relax, play, and have fun. Treat life like one big experiment and feel yourself in the flow of whatever comes your way. This card asks you to embrace your beautiful, carefree spirit, allowing yourself to connect to the energy that surrounds you and flows through you. Tap into your fullest potential by stepping into a place of wonderment, curiosity and intrigue. Live life as though you were a child once again. Laugh more, dance, and let your heart go free. This is an excellent card to meditate on if you are struggling with dread, worry or self-doubt in your life. The Fool is your guide, as someone who is daring and carefree. He is the embodiment of who you really are – your free spirit, your inner child, and your playful soul. Any time you experience fear, remember the essence of the Fool as he encourages you to acknowledge that fear and do it anyway! You never know what the future holds, but like the Fool, you must step into the unknown, trusting that the Universe will catch you and escort you along the way. Take a chance and see what happens.";

const tokenizedSentence = tokenizer.tokenize(sentence);
const taggedSentence = tagger
  .tag(tokenizedSentence)
  .taggedWords.filter((pair) => {
    // clean up any stray characters like ' or % or t that got classified
    return pair.token.length > 1;
  });

const nouns = taggedSentence.filter((pair) => {
  return pair.tag == "NN" || pair.tag == "NP";
  // maybe include NNS and N?
});

const adjectives = taggedSentence.filter((pair) => {
  return pair.tag == "JJ";
  // probably no other adjective tags but would like to confirm
});

// do I see this on glitch?

console.log("Nouns:");
console.log(nouns.map((pair) => pair.token));
console.log("Adjectives:");
console.log(adjectives.map((pair) => pair.token));
