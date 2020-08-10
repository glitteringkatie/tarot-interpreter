const fs = require("fs");
const _ = require("lodash");
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

const majorArcana = "major-arcana"; // would be the pass in
const dir = `./scripts/${majorArcana}/`;
console.log('import Sentencer from "sentencer";\n');

fs.readdir(dir, (_err, fileNames) => {
  fileNames.forEach((fileName) => {
    fs.readFile(dir + fileName, "utf8", (_err, description) => {
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

      const content = {
        nounList: nouns.map((taggedWord) => taggedWord.token),
        adjectiveList: adjectives.map((taggedWord) => taggedWord.token),
      };

      const cardName = _.startCase(fileName.split(".")[0]);
      console.log(`const ${cardName}Sentencer = Sentencer.use(`);
      console.log(content);
      console.log(");");
    });
  });
  //TODO
  // append the following:
  // const MajorArcana = {
  //   fool: FoolSentencer,
  //   magician: MagicianSentencer,
  // };

  // export default MajorArcana;
});
