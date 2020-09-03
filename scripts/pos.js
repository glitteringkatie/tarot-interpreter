const fsPromises = require("fs").promises;
const _ = require("lodash");
const natural = require("natural");
const { exec } = require("child_process");

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

const parseWords = (description) => {
  const tokenizedDescription = tokenizer.tokenize(description);

  const taggedDescription = tagger
    .tag(tokenizedDescription)
    .taggedWords.filter((taggedWord) => {
      // clean up any stray characters like ' or % or t that got classified
      return taggedWord.token.length > 1;
    });

  const nouns = taggedDescription
    .filter((taggedWord) => {
      return taggedWord.tag == "NN" || taggedWord.tag == "NP";
      // maybe include NNS and N?
    })
    .map((taggedWord) => taggedWord.token);

  const adjectives = taggedDescription
    .filter((taggedWord) => {
      return taggedWord.tag == "JJ";
      // probably no other adjective tags but would like to confirm
    })
    .map((taggedWord) => taggedWord.token);

  return { nouns, adjectives };
};

const majorArcana = "major-arcana"; // would be the pass in
const dir = `./scripts/${majorArcana}/`;

fsPromises.readdir(dir).then((files) => {
  Promise.all(
    files.map((file) => {
      return fsPromises
        .readFile(dir + file, { encoding: "utf8" })
        .then((description) => {
          const { nouns, adjectives } = parseWords(description);
          const name = _.startCase(file.split(".")[0]);

          return [
            name,
            {
              nounList: nouns,
              adjectiveList: adjectives,
            },
          ];
        });
    })
  )
    .then((promises) => {
      // build up content
      const content = promises.reduce((acc, [cardName, lists]) => {
        acc += `const ${cardName}Sentencer = Sentencer.use(`;
        acc += JSON.stringify(lists);
        acc += ");\n\n";
        return acc;
      }, 'import Sentencer from "sentencer";\n\n');

      const exportObject =
        "const MajorArcana = {" +
        promises.map(([cardName, _lists]) => {
          return `${cardName.toLowerCase()}: (template) => ${cardName}Sentencer.make(template)\n`;
        }) +
        "};\n\n";

      const end = "export default MajorArcana;";

      return content + exportObject + end;
    })
    .then((content) => {
      // create the file
      const fileName = `src/lib/${majorArcana}.js`;
      fsPromises.writeFile(fileName, content);
      return fileName;
    })
    // format the file
    .then((fileName) => exec(`npx prettier ${fileName} --write`));
});
