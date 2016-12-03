---
title: Programming advent calendars
layout: post
excerpt: If you like coding and advent calendars I can really recommend Advent of Code. Every day up until Christmas you get access to a new two-part task you have to solve with programming.
---
If you like coding and advent calendars I can really recommend [Advent of Code](http://adventofcode.com/2016). Every day up until Christmas you get access to a new two-part task you have to solve with programming.

Here is my solution to day 3 if you want to get inspired/see what it can be:

```
var fs = require('fs');

var triangles = fs.readFileSync('./input-triangles.txt', 'UTF-8');
triangles = triangles.split("\n");

var possibles = 0;
var possibles2 = 0;

var i = 1;
var cols = [];

triangles.forEach(function(line) {
  line = line.replace(/^-/, '');
  
  var a = parseInt(line.substr(0, 3).trimLeft());
  var b = parseInt(line.substr(5, 3).trimLeft());
  var c = parseInt(line.substr(10, 3).trimLeft());
  
  if ((a + b > c) && (a + c > b) && (b + c > a)) {
    possibles = possibles + 1;
  }

  if (i < 3) {
    cols.push([a, b, c]);
    i++;
  }
  else if (i == 3){
    cols.push([a, b, c]);
    for (var k = 0; k < 3; k++) {

      var aa = parseInt(cols[0][k]);
      var bb = parseInt(cols[1][k]);
      var cc = parseInt(cols[2][k]);
      if ((aa + bb > cc) && (aa + cc > bb) && (bb + cc > aa)) {
        possibles2 = possibles2 + 1;
      }
    }
    cols = [];
    i = 1;
  }
});

console.log(possibles);
console.log(possibles2);
```

I really enjoy these kinds of challenges, because they make me think about solving stuff I normally wouldn’t. And when I try to solve the problems I often come across things I can use later in my regular work.

So if you have some spare time and enjoy challenges I really recommend programming advent calendars.
