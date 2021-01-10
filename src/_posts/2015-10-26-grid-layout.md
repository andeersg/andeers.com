---
title: CSS Grid Layout
layout: post
excerpt: If you have worked with the web, grids are nothing new to you. The grid layout specification is a different take on grids than the numerous grid frameworks that exist.
permalink: /2015/10/grid-layout/
---
If you have worked with the web, grids are nothing new to you. The grid layout specification is a different take on grids than the numerous grid frameworks that exist.

Much like Flexbox does the Grid Layout allow us to control the html in a new and simpler way.

Even though Bootstrap has made it quite easy to set up a grid, there is a still a battle of negative margins, paddings, floating and clearfixes going on.

The Grid Layout specification tries to make it easy to generate grids with rows and columns. With it you can use the space available in a smart way.

You can easily set a column to a fixed with, and another one to take up the rest of the width available. And you have the same options for height, a row can be set to take up all remaining vertical space.

> The only way you can test it is with Chrome Canary and a experimental flag turned on.

Unfortunatly Grid Layout has a really poor browser support at the moment. The only way you can test it is with Chrome Canary and a experimental flag turned on. For more updated information on this you can check [caniuse.com](http://caniuse.com/#feat=css-grid "CSS Grid on caniuse.com").

## Technical stuff

We need a parent element to get started:

```css
#grid-parent {
  display: grid;
  grid-template-columns: auto minmax(min-content, 1fr);
  grid-template-rows: auto minmax(min-content, 1fr) auto
}
```

Here we see that the display property has a new value, and that we have two new properties defining the rows and columns in the grid.

The rows and columns are separated with a space, so here we have two columns and three rows.

The various rows and columns can be defined with various values:

* CSS Length value (like px),
* Percentage
* Flex factor (defined with the value fr)
* `min-content` (make the column at least as wide as the content)
* `max-content` (don't make the column larger than the content)
* `minmax()` (takes both a minimum and a maximum value)


## Elements in the grid

After we have defined the grid we can take control of the elements inside.

```html
<div id="grid-parent">
  <div id="logo"></div>
  <div id="stats"></div>
  <div id="board"></div>
  <div id="score"></div>
</div>
```

Here we have a simple markup for a game board. To place these elements in the grid we use the following CSS:

```css
#logo   { grid-column: 1; grid-row: 1 }
#stats  { grid-column: 1; grid-row: 2 / span 2; align-self: start }
#board  { grid-column: 2; grid-row: 1 / span 2; }
#score  { grid-column: 2; grid-row: 3; justify-self: center }
```

The logo goes top left, below the logo we place the stats. Since we don't have anything to put below, the stats use two rows.

The board also takes two rows in the other column, with the scores underneath.

Since all the grid layouts are defined in the CSS we can easily alter the grid at different breakpoints or with just a parent class.

```css
@media (max-width: 600px) {
  #grid-parent {
    grid-template-columns: auto;
    grid-template-rows: auto min-content auto auto;
  }
  #grid-parent * {
    grid-column: 1;
  }
  #logo   { grid-row: 1; }
  #stats  { grid-row: 4; }
  #board  { grid-row: 2; }
  #score  { grid-row: 3; }
}
```

Here we completely alter the grid at a small breakpoint, we change it to one column and add some more rows. We also change the order of the elements.



## Summary

This was a very short introduction to CSS Grids, and I really recommend the [specifications](http://www.w3.org/TR/css-grid-1 "The specifications") for more examples.
