const { DateTime } = require('luxon');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const metadata = require('./_data/metadata.json');
const eleventyVars = require('./_data/eleventy');
const snippetGenerator = require('./_helpers/excerpt');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(syntaxHighlight);

	function getPosts(collectionApi) {
		const globs = [
			'./_posts/*',
		];
		if (eleventyVars.env == 'development') {
			globs.push('./_drafts/*');
		}

		return collectionApi.getFilteredByGlob(globs).reverse().filter(function(item) {
			return !!item.data.permalink;
		});
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

	eleventyConfig.addCollection('latestPosts', function(collection) {
		let posts = getPosts(collection);

		let items = [];
		for( let item of posts ) {
			if( (!!item.inputPath.match(/\/_posts\//) || !!item.inputPath.match(/\/_drafts\//)) && !hasTag(item, "external") ) {
				items.push( item );
				if( items.length >= 5 ) {
					return items;
				}
			}
		}
	});
	
	eleventyConfig.addFilter("typeOf", function(value) {
		return typeof value;
	});

	eleventyConfig.addFilter('stringify', function(value) {
		return JSON.stringify(value);
	});

	eleventyConfig.addFilter("raw", function(options) {
		return options.fn();
	});

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

	eleventyConfig.addFilter('readableDate', dateObj => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
	});

	eleventyConfig.addFilter('getYear', dateObj => {
		return DateTime.fromJSDate(dateObj).year;
	});

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

	eleventyConfig.addFilter('getAbsoluteUrl', path => {
		return `${metadata.url}${path}`;
	});

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

	// Pass through:
	eleventyConfig.addPassthroughCopy('assets');
	eleventyConfig.addPassthroughCopy('wp-content');
	eleventyConfig.addPassthroughCopy('favicon.ico');

  return {
		passthroughFileCopy: true,
		htmlTemplateEngine: 'hbs',
		markdownTemplateEngine: "hbs"
  };
};