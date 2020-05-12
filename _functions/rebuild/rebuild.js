const fs = require('fs');

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const token = event.queryStringParameters.token || false;
    if (token !== process.env.REBUILD_TOKEN) {
      return {
        statusCode: 200,
        body: '{}',
      }
    }

    // Check a token or something to prevent calls from anyone.

    const posts = fs.readdirSync('./_posts/');
    // Go through and check if there are dates in the future.
    // If we find any call netlify url to rebuild.

    return {
      statusCode: 200,
      body: JSON.stringify({})
    }
  } catch (err) {
    // Log errors somewhere?
    return { statusCode: 200, body: '{}' };
  }
}
