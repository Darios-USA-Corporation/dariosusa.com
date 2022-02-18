const i18n = require('eleventy-plugin-i18n');
const translations = require('./_data/i18n');

module.exports = function(eleventyConfig) {
  // Copy files
  eleventyConfig.addPassthroughCopy('./js/');
  eleventyConfig.addPassthroughCopy('./imgs/');
  eleventyConfig.addPassthroughCopy('./css/');
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      'es': 'en-US'
    }
  });
  return {
    dir: {
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    }
  }
};
  