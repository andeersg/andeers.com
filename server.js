/**
 * A small local server.
 */
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.static('_site'));

app.get('/*', function (req, res, next) {
  var options = {
    root: path.join(__dirname, '_site'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };
  res.status(404).sendFile('404.html', options);
});

app.listen(8083, () => {});