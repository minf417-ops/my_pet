module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/manifest.json");
  eleventyConfig.addPassthroughCopy("src/sw.js");
  eleventyConfig.addPassthroughCopy("src/icon-192.svg");
  eleventyConfig.addPassthroughCopy("src/icon-512.svg");
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
