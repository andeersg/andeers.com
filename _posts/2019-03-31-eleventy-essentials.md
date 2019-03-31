---
title: Eleventy Essentials
permalink: /2019/03/eleventy-essentials/
---
I switched my personal site to [Eleventy](https://www.11ty.io/ "11ty.io") recently. It's a very good static site generator.  Here are some tips and tricks I have discovered that are nice to have when you are creating a site.

## Start using the _data folder

If you come from Jekyll you are used to different kinds of variables being available in your templates (`site.time`, `site.posts`).
Eleventy does not have these by default, but it's quite easy to add them (and more).

Each JSON/JS file in the `_data` folder will become available under the filename namespace in your templates. So `_data/meta.json` becomes available as `meta.some_key_inside_file`.

### eleventy.js

The first file I create contains things related to the engine and environment.
```javascript
module.exports = {
  production: process.env.ELEVENTY_ENV === 'production',
  development: process.env.ELEVENTY_ENV === 'development',
  env: process.env.ELEVENTY_ENV || 'development',
  notReady: false, // Flag to prevent something from rendering.
  time: () => {
    return new Date(); // Simplest example, could use Moment.js to return another format.
  },
};
```

This gives me access to information about environment so I can exclude Google Analytics if it's not production, or print more information in development.

### metadata.json

```json
{
  "title": "Andeers.com",
  "description": "Personal site of Anders Grendstadbakk",
  "url": "https://andeers.com/",
  "feed": {
    "subtitle": "I mainly write about web development and tech.",
    "filename": "feed.xml",
    "path": "/feed/feed.xml",
    "url": "https://andeers.com/feed/feed.xml",
    "id": "https://andeers.com/"
  },
  "author": {
    "name": "",
    "email": ""
  }
}
```

The metadata.json contains information about this site and me. I also have some fields for the RSS feed. It's nice to collect all this information in one file so when you make changes you have it all together.

## .eleventy.js

This file is where you define collections, filters, and shortcodes. 

A hot tip is that since this is node.js you can `require()` your data files here and access the variables. This way you can use content from `metadata` in helper functions, or output something different in development.

```javascript
const eleventyVars = require('./_data/eleventy');
```

### Create a collection based on a folder of files

```javascript
eleventyConfig.addCollection('posts', function(collection) {
  return collection.getFilteredByGlob('./_posts/*').reverse().filter(function(item) {
    // Only include items with a permalink.
    return !!item.data.permalink;
  });
});
```
This gives you a collection of all items in the `_posts` folder.

### Latest posts

```javascript
eleventyConfig.addCollection('latestPosts', function(collection) {
  const posts = collection.getSortedByDate().reverse();

  let items = [];
  for( let item of posts ) {
    if(!!item.inputPath.match(/\/_posts\//)) {
      items.push( item );
      if( items.length >= 5 ) {
        return items;
      }
    }
  }
});
```

This snippet gives you a variable with the 5 latest posts you can use on your front page.

### Date functions

```javascript
eleventyConfig.addFilter('readableDate', dateObj => {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
});

// Used in Handlebars like this: {{readableDate post.date }}
```

This function renders the date in a specific way, but it could easily take another argument that specifies format, or use Moment.js in stead of Luxon.

### Meta functions

```javascript
eleventyConfig.addFilter('pageTitle', title => {
  if (title && title !== '') {
    return `${title} | ${metadata.title}`;
  }
  return metadata.title;
});

eleventyConfig.addFilter('pageDescription', (description, opt) => {
  const {content, excerpt } = opt.data.root;

  if (description && description !== '') {
    return description;
  }
  else if (excerpt && excerpt !== '') {
    return excerpt;
  }
  else if (content && content !== '' && !opt.data.root.isFront) {
    return snippetGenerator(content);
  }

  return metadata.description;
});
```

I have two functions I use for `<title>` and `<description>`. The first one renders the page title with the site name appended, and if a page title is not available it just returns the site name.

The pageDescription check multiple places for a description, first if one was specifically defined, then it tries to generate one from the content of the page. If that does not work it falls back to the generic site description.

## Other stuff

In the root index.html I add a `isFront: true` to the front matter, this makes it possible to do conditional stuff when rendering the front page:

```handlebars 
{{{{raw}}}}
<section>
  {{#if isFront}}
    <p>This paragraph is only written to the front page.</p>
  {{/if}}
  <p>This paragraph is rendered on all pages.</p>
</section>
{{{{/raw}}}}
```

Since my website is a work in progress I will probably find other useful snippets to make Eleventy even better, so [check this site out on Github](https://github.com/andeersg/andeers.com "Andeers.com on Github").