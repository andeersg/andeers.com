---
title: "Eleventy tip: Markdown template engine"
permalink: /2019/04/11ty-tip-markdown/
---
You can use helpers, filters and template logic in your markdown files. And by default the template language for markdown files is [liquid](https://www.11ty.io/docs/config/#default-template-engine-for-markdown-files "Default template engine for markdown files"). This can lead to interesting results when you use a different template language that looks the same.

To fix this and ensure correct results you can define which template engine should be used for markdown files like this (in `.eleventy.js`):

```javascript
module.exports = function(eleventyConfig) {
  return {
 		htmlTemplateEngine: 'hbs', // Engine for html files.
 		markdownTemplateEngine: 'hbs' // Engine for markdown files.
  };
};
```