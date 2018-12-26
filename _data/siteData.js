module.exports = {
  production: process.env.ELEVENTY_ENV === 'production',
  development: process.env.ELEVENTY_ENV === 'development',
};