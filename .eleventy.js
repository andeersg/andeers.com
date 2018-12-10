const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
  function getPosts(collectionApi) {
		return collectionApi.getFilteredByGlob("./_posts/*").reverse().filter(function(item) {
			return !!item.data.permalink;
		});
	}
	function hasTag(post, tag) {
		return "tags" in post.data && post.data.tags && post.data.tags.indexOf(tag) > -1;
	}

	eleventyConfig.addCollection('posts', function(collection) {
		return getPosts(collection);
	});

	eleventyConfig.addCollection("latestPosts", function(collection) {
		let posts = collection.getSortedByDate().reverse();
		let items = [];
		for( let item of posts ) {
			if( !!item.inputPath.match(/\/_posts\//) && !hasTag(item, "external") ) {
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

	// Pass through:
	eleventyConfig.addPassthroughCopy('assets');
	eleventyConfig.addPassthroughCopy('wp-content');
	eleventyConfig.addPassthroughCopy('favicon.ico');

  return {
		passthroughFileCopy: true,
		htmlTemplateEngine: 'hbs',
  };
};