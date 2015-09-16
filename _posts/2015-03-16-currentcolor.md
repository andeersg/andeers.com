---
title: currentColor
author: Anders
layout: post
permalink: /currentcolor/
categories:
  - CSS
tags:
  - color
---
currentColor is a quite unknown CSS value with good browser support, and i thought i should check it out and see if i could use it for something useful.

It&#8217;s supported in all major browsers [according to caniuse.com][1], except Internet Explorer 8 (of course).

Example usage:

    .element {
      color: #e6e6e6;
      border: 1px solid currentColor; /* #e6e6e6 */
    }
    .element a {
      color: currentColor; /* #e6e6e6 */
    }
    .second-element {
      color: currentColor; /* Not #e6e6e6 */
    }
    .third-element {
      border-color: #ff88aa;
      color: currentColor; /* Won't work */
    }
    

Both the border and the links inside the element will have the same color as defined on the first line.

For the second element `currentColor` will go up the dom until it finds another defined color, and if it doesn&#8217;t it will take take the browser default color (usually black).

For the third element it won&#8217;t work, since `currentColor` needs a `color: #somecolor;` before it to work. It won&#8217;t work with `background-color` or `border-color`.

This also mean that you cannot use it for a sibling element, it has to be a parent or the same element.

## What can it be used for?

The only thing i can think of is if you have some objects that should always be in a certain style. For example the comments of your site has been designed to have a orange border and orange links inside it. Then you have defined the color once and styled all elements inside your comment with `currentColor`.

I think its value is quite small when you probably already are using preprocessors for your CSS and have variables there.

But i like the idea of it and think i would have used it if i hadn&#8217;t preprocessors available.

 [1]: http://caniuse.com/#search=currentcolor "currentColor @ caniuse.com"