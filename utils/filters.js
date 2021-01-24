const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');
const metadata = require('../src/_data/metadata.json');

module.exports = {
    /**
   * Print content of file.
   */
  printFile: (filePath) => {
    const rootPath = path.resolve('./');
    const content = fs.readFileSync(rootPath + filePath, 'utf8');
    return content;
  },

  /**
   * Print the type of input variable.
   * 
   * Used mostly for debugging.
   */
  typeOf: (value) => {
    return typeof value;
  },

  /**
   * Print a stringified version of input.
   * 
   * Used mostly for debugging.
   */
  stringify: (value) => {
    return JSON.stringify(value);
  },

  /**
   * Raw filter.
   * 
   * Nice for showing code samples of the template language used.
   * 
   * @NOTE Could be hbs only.
   */
  raw: (options) => {
    return options.fn();
  },

  /**
   * Show post date in relative time.
   */
  timePosted: date => {
    let numDays = ((Date.now() - date) / (1000 * 60 * 60 * 24));
    let daysPosted = Math.round( parseFloat( numDays ) );
    let yearsPosted = parseFloat( (numDays / 365).toFixed(1) );

    if( daysPosted < 365 ) {
      return daysPosted + " day" + (daysPosted !== 1 ? "s" : "");
    } else {
      return yearsPosted + " year" + (yearsPosted !== 1 ? "s" : "");
    }
  },

  /**
   * Print the date in a specific format.
   * 
   * @NOTE Deprecate and move to formatDate function.
   */
  readableDate: dateObj => {
    const dt = DateTime.fromJSDate(dateObj);
    dt.setZone('Europe/Berlin');
    return dt.toFormat('dd LLLL yyyy');
  },

  /**
   * Print the date in a format.
   */
  formatDate: (date, format = 'LLLL dd, yyyy') => {
    const dt = DateTime.fromJSDate(date);
    dt.setZone('Europe/Berlin');
    return dt.toFormat(format);
  },

  /**
   * Print current date.
   */
  currentDate: (format = 'LLLL dd, yyyy') => {
    const dt = DateTime.fromJSDate(new Date());
    dt.setZone('Europe/Berlin');
    return dt.toFormat(format);
  },

  /**
   * Get the year of a date object.
   * 
   * @NOTE Could also be deprecated.
   */
  getYear: dateObj => {
    return DateTime.fromJSDate(dateObj).year;
  },

  /**
   * Groups a array of posts by year.
   * 
   * @deprecated Switched to nunjucks logic.
   */
  group_by_year: (context, options) => {
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
  },

  /**
   * Print absolute url.
   */
  getAbsoluteUrl: path => {
    return `${metadata.url}${path}`;
  },

  /**
   * Helper for page title, looks in different places.
   */
  pageTitle: title => {
    if (title && title !== '') {
      return `${title} | ${metadata.title}`;
    }
    return metadata.title;
  },

  /**
   * Helper for page description.
   */
  pageDescription: (description, opt) => {
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
  },
};