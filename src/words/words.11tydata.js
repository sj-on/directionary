const slugify = require("../../lib/slugify.js");

module.exports = {
  tags: ["word"],
  layout: "layouts/word.njk",
  eleventyComputed: {
    // src/words/a/apple.md -> filePathStem "/words/a/apple" -> letter "a"
    letter: (data) => data.page.filePathStem.split("/")[2],
    slug: (data) => slugify(data.word),
    permalink: (data) => {
      const letter = data.page.filePathStem.split("/")[2];
      return `/${letter}/${slugify(data.word)}/index.html`;
    },
    title: (data) => `${data.word} – directionary`,
    description: (data) => `${data.word}: ${data.meaning}`,
  },
};
