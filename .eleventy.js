const slugify = require("./lib/slugify.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("slugify", slugify);

  // Used on letter pages to pick only the words that start with the
  // current letter out of the full sorted `words` collection.
  eleventyConfig.addFilter("byLetter", (words, letter) =>
    (words || []).filter((w) => w.data.letter === letter)
  );

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Every file under src/words/** is tagged "word" via
  // src/words/words.11tydata.js — this collects + alphabetizes them.
  eleventyConfig.addCollection("words", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("word")
      .sort((a, b) => a.data.word.localeCompare(b.data.word));
  });

  eleventyConfig.addCollection("recentWords", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("word")
      .sort((a, b) => {
        const aDate = a.data.dateAdded || "";
        const bDate = b.data.dateAdded || "";
        return bDate.localeCompare(aDate);
      })
      .slice(0, 10);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
