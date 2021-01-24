const fs = require('fs');
const iconFolder = 'assets/icons/';
const icons = {
  dev: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285 147" class="dev"><path d="M87.3 24.9L71.1 8.7c-2.4-2.4-6.3-2.4-8.7 0L1.8 69c-2.4 2.4-2.4 6.3 0 8.7l60.6 60.6c2.4 2.4 6.3 2.4 8.7 0l16.2-16.2c2.4-2.4 2.4-6.3 0-8.7L47.4 73.5l39.9-39.9c2.4-2.4 2.4-6.3 0-8.7zM283.2 69L222.6 8.7c-2.4-2.4-6.3-2.4-8.7 0l-16.2 16.2c-2.4 2.4-2.4 6.3 0 8.7l39.9 39.9-39.9 39.9c-2.4 2.4-2.4 6.3 0 8.7l16.2 16.2c2.4 2.4 6.3 2.4 8.7 0l60.3-60.6c2.7-2.1 2.7-6.3.3-8.7zM175.2 0h-19.5c-2.7 0-5.1 1.8-6 4.2l-45.9 134.4c-1.5 4.2 1.5 8.4 6 8.4h19.5c2.7 0 5.1-1.8 6-4.2L181.5 8.4c1.2-4.2-1.8-8.4-6.3-8.4z"/></svg>`,
};


module.exports = {
  squiggle: function(color = false) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256.2 30" class="wave" ${color ? `style="--line-color: ${color};"`: ''}>
      <path d="M253.2 0c-11.7 0-17.7 6.9-23.1 12.9-5.1 6-9.6 11.1-18.6 11.1s-13.5-5.1-18.6-11.1C187.8 6.9 181.8 0 169.8 0c-11.7 0-17.7 6.9-23.1 12.9-5.1 6-9.6 11.1-18.6 11.1s-13.5-5.1-18.6-11.1C104.1 6.9 98.1 0 86.4 0S68.7 6.9 63.3 12.9c-5.1 6-9.6 11.1-18.6 11.1s-13.5-5.1-18.6-11.1C20.7 6.9 14.7 0 3 0 1.2 0 0 1.2 0 3s1.2 3 3 3c9 0 13.5 5.1 18.6 11.1C27 23.1 33 30 44.7 30s17.7-6.9 23.1-12.9C72.9 11.1 77.4 6 86.4 6s13.5 5.1 18.6 11.1c5.4 6 11.4 12.9 23.1 12.9 11.7 0 17.7-6.9 23.1-12.9 5.1-6 9.6-11.1 18.6-11.1s13.5 5.1 18.6 11.1c5.4 6 11.4 12.9 23.1 12.9 11.7 0 17.7-6.9 23.1-12.9 5.1-6 9.6-11.1 18.6-11.1 1.8 0 3-1.2 3-3s-1.2-3-3-3z"/>
    </svg>`;
  },
  dev: function(color = false) {
    return icons.dev;
  },
  icon: function(id, color = false) {
    return icons[id];
  },
  iconLoader: function(name) {
    const svg = fs.readFileSync(`${process.cwd()}/${iconFolder}${name}.svg`, 'utf8');
    return svg;
  },

  attributes: function(attributes) {
    console.log(attributes);
    return 'attributes';
  },
};