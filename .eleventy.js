require('dotenv').config();

const fs = require('fs');
const { DateTime } = require('luxon');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const metadata = require('./src/_data/metadata.json');
const eleventyVars = require('./src/_data/eleventy')();
const snippetGenerator = require('./src/_helpers/excerpt');
const { addLanguageAttribute } = require('./src/_helpers/transforms');

module.exports = function(eleventyConfig) {

  /*
   * Plugins.
   */
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addTransform("pre-language", addLanguageAttribute);

  // Enable quiet mode in production.
  if (eleventyVars.production) {
    eleventyConfig.setQuietMode(true);
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

  eleventyConfig.addCollection('posts', function(collection) {
    return getPosts(collection);
  });

  /**
   * All items that should have a generated image.
   * 
   * Inspired by https://github.com/philhawksworth/hawksworx.com
   */
  eleventyConfig.addCollection('cards', function(collection) {
    return collection.getAll().filter(function(item) {
      return "card" in item.data;
    });
  });

  /**
   * Show a specified amount of posts.
   * 
   * @NOTE Could be removed and the regular posts can be used with a limit.
   */
  eleventyConfig.addCollection('latestPosts', function(collection) {
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
   * The filter section.
   */


  /**
   * Print content of file.
   */
  eleventyConfig.addFilter('printFile', (path) => {
    const content = fs.readFileSync(__dirname + path, 'utf8');
    return content;
  });

  /**
   * Print the type of input variable.
   * 
   * Used mostly for debugging.
   */
  eleventyConfig.addFilter("typeOf", function(value) {
    return typeof value;
  });

  /**
   * Print a stringified version of input.
   * 
   * Used mostly for debugging.
   */
  eleventyConfig.addFilter('stringify', function(value) {
    return JSON.stringify(value);
  });

  /**
   * Raw filter.
   * 
   * Nice for showing code samples of the template language used.
   */
  eleventyConfig.addFilter("raw", function(options) {
    return options.fn();
  });

  /**
   * Show post date in relative time.
   */
  eleventyConfig.addFilter('timePosted', date => {
    let numDays = ((Date.now() - date) / (1000 * 60 * 60 * 24));
    let daysPosted = Math.round( parseFloat( numDays ) );
    let yearsPosted = parseFloat( (numDays / 365).toFixed(1) );

    if( daysPosted < 365 ) {
      return daysPosted + " day" + (daysPosted !== 1 ? "s" : "");
    } else {
      return yearsPosted + " year" + (yearsPosted !== 1 ? "s" : "");
    }
  });

  /**
   * Print the date in a specific format.
   * 
   * @NOTE Deprecate and move to formatDate function.
   */
  eleventyConfig.addFilter('readableDate', dateObj => {
    const dt = DateTime.fromJSDate(dateObj);
    dt.setZone('Europe/Berlin');
    return dt.toFormat('dd LLLL yyyy');
  });

  /**
   * Print the date in a format.
   */
  eleventyConfig.addFilter('formatDate', (date, format = 'LLLL dd, yyyy') => {
    const dt = DateTime.fromJSDate(date);
    dt.setZone('Europe/Berlin');
    return dt.toFormat(format);
  });

  /**
   * Print current date.
   */
  eleventyConfig.addFilter('currentDate', (format = 'LLLL dd, yyyy') => {
    const dt = DateTime.fromJSDate(new Date());
    dt.setZone('Europe/Berlin');
    return dt.toFormat(format);
  });

  /**
   * Get the year of a date object.
   * 
   * @NOTE Could also be deprecated.
   */
  eleventyConfig.addFilter('getYear', dateObj => {
    return DateTime.fromJSDate(dateObj).year;
  });

  /**
   * Groups a array of posts by year.
   */
  eleventyConfig.addFilter('group_by_year', function(context, options) {
    const yearPosts = {};
    let ret = "";

    context.forEach((post) => {
      const year = DateTime.fromJSDate(post.date).year;
      yearPosts[year] = yearPosts[year] || [];

      yearPosts[year].push(post);
    });

    const sortedYears = Object.keys(yearPosts).sort().reverse();

    sortedYears.forEach((year) => {
      ret += options.fn({
        year: year,
        posts: yearPosts[year],
      });
    });

    return ret;
  });

  /**
   * Print absolute url.
   */
  eleventyConfig.addFilter('getAbsoluteUrl', path => {
    return `${metadata.url}${path}`;
  });

  /**
   * Helper for page title, looks in different places.
   */
  eleventyConfig.addFilter('pageTitle', title => {
    if (title && title !== '') {
      return `${title} | ${metadata.title}`;
    }
    return metadata.title;
  });

  /**
   * Helper for page description.
   */
  eleventyConfig.addFilter('pageDescription', (description, opt) => {
    if (!opt) {
      return metadata.description;
    }

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

  // Pass through:
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('wp-content');
  eleventyConfig.addPassthroughCopy('favicon.ico');

  eleventyConfig.setBrowserSyncConfig({
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