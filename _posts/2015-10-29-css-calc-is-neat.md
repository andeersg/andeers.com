---
title: CSS Calc is pretty neat
layout: post
excerpt: By using calc it's really easy to make elements use the full width of the page even if the rest of the site is centered.
---
With a centered layout it can be hard to have full with elements without a hassle.

In this post will I show you a neat trick to get full width sections in a layout that are centered. If you just want the demo
check out this [CodePen](http://codepen.io/andeersg/full/gaKadg/ "CodePen demo showing the layout trick").

The snippet should work in Internet Explorer 9 and up and the other major browsers.

```scss
.full {
  left: calc((100% - 100vw)/2);
  position: relative;
  width: 100vw;
  min-height: 1px;

  // Optional (center padding both sides):
  padding-left: calc((100vw - 100%)/2);
  padding-right: calc((100vw - 100%)/2);
}
```
{: .language-scss}

## The how

The **vw** unit is the width of the viewport. 100vw is the width of your browser window, 50vw is half.

The left property is where the magic happens:

```scss
calc((100% - 100vw)/2)
```

* 100% is the full width of the element.
* 100vw is the width of the screen.
* So a screen that is 1200 pixels wide and a element that is 700px wide gives this equation: `(700px - 1200px) / 2`.
* The result of this is **-250**, so we move the element 250 pixels to the left.
* Then we set the width of the element to the full with of the viewport.

## Extra options

To center the content inside the full width element we add padding to both sides by flipping the calc function:

```
padding-left: calc((100vw - 100%) / 2);
```

I have created a simple demo on CodePen you can explore, with examples for right and left padding only.


<p data-height="268" data-theme-id="0" data-slug-hash="gaKadg" data-default-tab="result" data-user="andeersg" class='codepen'>See the Pen <a href='http://codepen.io/andeersg/pen/gaKadg/'>CSS Calc examples</a> by andeersg (<a href='http://codepen.io/andeersg'>@andeersg</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>