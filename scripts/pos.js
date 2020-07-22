const fs = require("fs");
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
const tokenizer = new natural.TreebankWordTokenizer();

const majorArcana = "./scripts/major-arcana/";

fs.readdir(majorArcana, (err, fileNames) => {
  fileNames.forEach((fileName) => {
    fs.readFile(majorArcana + fileName, "utf8", (err, description) => {
      // console.log(description);
      const tokenizedDescription = tokenizer.tokenize(description);

      const taggedDescription = tagger
        .tag(tokenizedDescription)
        .taggedWords.filter((taggedWord) => {
          // clean up any stray characters like ' or % or t that got classified
          return taggedWord.token.length > 1;
        });

      const nouns = taggedDescription.filter((taggedWord) => {
        return taggedWord.tag == "NN" || taggedWord.tag == "NP";
        // maybe include NNS and N?
      });

      const adjectives = taggedDescription.filter((taggedWord) => {
        return taggedWord.tag == "JJ";
        // probably no other adjective tags but would like to confirm
      });

      console.log("Nouns:");
      console.log(nouns.map((taggedWord) => taggedWord.token));
      console.log("Adjectives:");
      console.log(adjectives.map((taggedWord) => taggedWord.token));
    });
  });
});
