---
title: Getting started with Backbone.js
author: Anders
layout: post
permalink: /getting-started-with-backbone-js/
categories:
  - Development
tags:
  - Backbone
---
I have wanted to look at JavaScript frameworks for some time now. I like the idea to only send JSON data from the server and let the client do the rest. But there is a jungle of frameworks, so it is hard to get information about which one you should choose.

I started on a small project for a client at work where they wanted to list courses and let people sign up. It was going to be a one-page application with courses listed on the left and the selected course on the right. This page is built with Drupal and my usual way of solving this would be to create all the markup with PHP and output it. Then i would use jQuery to switch between courses and do stuff. It was also important that you could link to a single course, so this would mean GET-variables or something.

I have been using sites like [Wunderlist][1] and [Godt.no][2] (Norwegian site) and i like how they work. Both use Backbone.js. So because of this i choose Backbone.js for my project. With Backbone.js i can have templates for the project and it has built-in router functionality with hash-urls (and pushState when older browsers no longer needs to be supported).

When i started with Backbone.js i took a look at the [TodoMVC project][3]. They have lots of example apps written with lots of frameworks. It&#8217;s a good resource for lots of JavaScript frameworks. My first thoughts when looking at Backbone code was that it was very cryptic and hard to understand. It took a while do dissect the code and understand the different parts.

I learned that the best way to understand it (for me) was to break down the examples, modify them and create small projects. For me this works way better than reading the documentation (but i think the documentation is important for reference).

I plan to write about the different parts of a Backbone application here on my blog. The first one will be about the &#8220;model&#8221;.

## Further reading

  * [Backbonejs.org][4] &#8211; Documentation
  * [TodoMVC][3]
  * [Backbone tutorial by Christophe Coenraets][5]

 [1]: https://www.wunderlist.com/en/ "Wunderlist"
 [2]: http://godt.no "Godt.no"
 [3]: http://todomvc.com/ "TodoMVC"
 [4]: http://backbonejs.org/ "Backbone Documentation"
 [5]: http://coenraets.org/blog/2011/12/backbone-js-wine-cellar-tutorial-part-1-getting-started/ "Backbone Wine Cellar Tutorial"