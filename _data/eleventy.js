/**
 * @file
 * System variables like environment and similar.
 */

module.exports = {
  production: process.env.ELEVENTY_ENV === 'production',
  development: process.env.ELEVENTY_ENV === 'development',
  includeDrafts: () => {
    return !!process.argv.filter(i => i == '--include-drafts').length;
  }
};