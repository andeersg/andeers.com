/**
 * @file
 * System variables like environment and similar.
 */

module.exports = {
  production: process.env.ELEVENTY_ENV === 'production',
  development: process.env.ELEVENTY_ENV === 'development',
  env: process.env.ELEVENTY_ENV || 'development',
  includeDrafts: () => {
    return !!process.argv.filter(i => i == '--include-drafts').length;
  },
  notReady: false, // Flag to prevent something from rendering.
};