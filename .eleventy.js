require('dotenv').config();

const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const eleventyVars = require('./src/_data/eleventy')();
const { addLanguageAttribute } = require('./src/_helpers/transforms');

const filters = require('./utils/filters.js');
const shortcodes = require('./utils/shortcodes.js');

module.exports = function(config) {

  /*
   * Plugins.
   */
  config.addPlugin(pluginRss);
  config.addPlugin(syntaxHighlight);

  config.addTransform("pre-language", addLanguageAttribute);

  // Enable quiet mode in production.
  if (eleventyVars.production) {
    config.setQuietMode(true);
  }

  /**
   * Helper to return correct posts.
   */
  function getPosts(collectionApi) {
    const globs = [
      './src/_posts/*',
    ];
    const now = new Date();

    const drafts = (item) => {
      if (!eleventyVars.development && item.data.draft) {
        // If not development, and draft is true, skip.
        return false
      }
      // Return everything by default.
      return true;
    };
    const future = (item) => {
      if (item.date <= now) {
        return true;
      }

      if (eleventyVars.development) {
        // If we get here date is in future, return true if development.
        return true;
      }

      return false;
    };

    // Filter future dates if not development
    // Remove draft folder and filter on property draft

    return collectionApi.getFilteredByGlob(globs)
      .filter(item => !!item.data.permalink)
      .filter(drafts)
      .filter(future)
      .reverse();
  }

  function hasTag(post, tag) {
    return "tags" in post.data && post.data.tags && post.data.tags.indexOf(tag) > -1;
  }

  config.addCollection('posts', function(collection) {
    return getPosts(collection);
  });

  /**
   * Show a specified amount of posts.
   * 
   * @NOTE Could be removed and the regular posts can be used with a limit.
   */
  config.addCollection('latestPosts', function(collection) {
    let posts = getPosts(collection);

    let items = [];
    for( let item of posts ) {
      if( (!!item.inputPath.match(/\/_posts\//) || !!item.inputPath.match(/\/_drafts\//)) && !hasTag(item, "external") ) {
        items.push( item );
        if( items.length >= 4 ) {
          return items;
        }
      }
    }
  });
  
  /*
   * The filter section:
   */
  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName]);
  });

  /**
   * Shortcodes:
   */
  config.addShortcode('squiggle', shortcodes.squiggle);
  config.addShortcode('dev', shortcodes.dev);
  config.addShortcode('iconLoader', shortcodes.iconLoader);
  config.addShortcode('attributes', shortcodes.attributes);

  
  // Pass through:
  config.addPassthroughCopy('assets');
  config.addPassthroughCopy('src/wp-content');
  config.addPassthroughCopy('src/favicon.ico');
  config.addPassthroughCopy('src/admin');

  // config.addGlobalData("isFront", false);

  // Make it easy to change browsersync port.
  config.setBrowserSyncConfig({
    port: process.env.PORT || '8080',
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data'
  },
    passthroughFileCopy: true,
    templateFormats: ['hbs', 'njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: "hbs"
  };
};