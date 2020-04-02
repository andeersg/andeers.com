function addLanguageAttribute(content, outputPath) {
  if (outputPath.endsWith('.html')) {
    if (content.match(/<pre class="language-([a-zA-Z]+)">/g)) {
      const matches = content.matchAll(/<pre class="language-([a-zA-Z]+)">/g);
      let newContent = content;
      const langs = new Set();

      for (const match of matches) {
        const lang = match[0].replace('<pre class="language-', '').replace('">', '');
        langs.add(lang);
      }

      langs.forEach(lang => {
        newContent = newContent.replace(`<pre class="language-${lang}">`, `<pre class="language-${lang}" data-language="${lang}">`);
      });
      return newContent;
    }
  }
  return content;
}


module.exports = {
  addLanguageAttribute: addLanguageAttribute,
};