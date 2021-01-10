/**
 * @file
 * System variables like environment and similar.
 */
module.exports = () => {
  let env = process.env.ELEVENTY_ENV || 'development';
  const context = process.env.CONTEXT || 'development'; // Variable set by netlify.

  // If building previews in netlify I think we want development mode.
  if (context !== 'production') {
    env = 'development';
  }

  return {
    production: env === 'production',
    development: env === 'development',
    context: context,
    env: env,
    notReady: false,
    time: new Date(),
    enableGA: false,
  }
};
