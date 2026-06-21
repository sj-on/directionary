exports.data = {
  permalink: "/words.json",
  eleventyExcludeFromCollections: true,
};

exports.render = function (data) {
  const words = (data.collections.words || []).map((w) => ({
    word: w.data.word,
    pos: w.data.pos,
    meaning: w.data.meaning,
    letter: w.data.letter,
    slug: w.data.slug,
    pronunciation: w.data.pronunciation || null,
  }));
  return JSON.stringify(words);
};
