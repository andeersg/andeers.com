/**
 * @file
 * Generate a text snippet from html.
 */
const excerpts = require('excerpts');

module.exports = (content, length = 300) => {
  var text = excerpts(content, { characters: length });
  return text;
};