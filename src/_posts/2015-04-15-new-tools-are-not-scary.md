---
title: New tools are not scary
author: Anders
layout: post
permalink: /new-tools-are-not-scary/
categories:
  - Development
  - Productivity
tags:
  - JavaScript
  - workflow
---
Being a developer is not the same as it was a couple of years ago. It was HTML, CSS and JS you had to cope with. These days it&#8217;s completely different.

Every day there are new tools and technologies coming out that can help and improve our workflows. New stuff can often look scary and it&#8217;s easy to feel like todays workflow and way of doing stuff is the best.

> Why should i spend time learning all this new stuff when I get my work done now?
> 
> &#8212; <cite>Probably some developer</cite> 

And if we try all the tools out there we probably will spend all our time learning stuff. But there are really some good tools that can improve our workflows.

## Don&#8217;t be afraid

One thing I have learned from my self is to not be afraid of stuff only because it&#8217;s new or different. You can&#8217;t have a real opinion on stuff without trying it first.

Being afraid of change is not a uncommon thing, just take a look at **every** change Facebook has done the last years. For each change we have multiple groups with people wanting to revert it and there are news articles about it.

But usually no change is reverted, people stop complaining and just learn to use the site with the new changes. Maybe was it a good change if they think about it.

It&#8217;s the same about preprocessors, gulp, grunt, yeoman, bower, travis-ci, backbone, angular or mocha. When you first hear about them they sound scary and difficult. But probably you will benefit from using a couple of those. Next I will share a couple of the tools I use.

## Tools I use

**1. SCSS**  
I&#8217;m not sure when, but I started to use the preprocessor SCSS for my CSS a long time ago, I used it with Compass. You probably know what SCSS is, but here is the short summary from [sass-lang][1]?

> Sass is the most mature, stable, and powerful professional grade CSS extension language in the world. 

It allows you to split your CSS into multiple files, use variables and functions (mixins).

**2. [Grunt][2] and [Gulp][3]**  
Grunt and Gulp are task runners written in [Node.js][4]. They do not to much on their own, but when you give them tasks to do they get really powerful.

I started with Grunt, but now I mostly use Gulp. I think they both can accomplish the same, but I prefer the shorter config of Gulp.

The first task I made was for SCSS, so instead of having to run `compass watch`, I now write `gulp watch`. But the magic of Gulp is that I also have some extra plugins, like the [Autoprefixer][5]. After Gulp has compiled my SCSS it sends it to this plugins that check if it should prefix some CSS for me.

I also have a Javascript task in Gulp that &#8220;lints&#8221; my files and notifies me of errors, merges files together and minifies it for me.

All of this happens inside Gulp, and it has become a tool I don&#8217;t want to live without.

**3. [Yeoman][6]**  
Yeoman is one of the latest tools I have looked at. It&#8217;s also written in Node.js and is a scaffolding tool. I use it to create folder structures and files for Drupal modules at work, and I also have a Gulp workflow it can set up for me.

It&#8217;s a command line tool, so to use it you have to be a little familiar with the command line.

Yeoman is a good example of a tool I thought was scary for a long time, I had heard about it but never looked at what it really was.

**4. [Travis CI][7]**  
I had heard about automatic testing from colleagues and really thought it sounds smart, but I never looked at it myself. The idea that a external service automatically checks your code and reports back if it finds problems or if everything is ok sounds amazing.

And it really is. When I created [a generator for Yeoman][8], I decided that I also should add tests for it. Since my generator is pretty simple, my test (for now) only checks if the correct files and folders are created. Travis provides you with a badge you can have in your readme file on Github that updates itself according to the test results.

So with a successful test you get this green nice badge:  
<img src="/wp-content/uploads/2015/04/Skjermbilde-2015-04-15-20.35.55-1024x199.png" alt="Travis build passing, one of the new tools I use" width="640" height="124" class="aligncenter size-large wp-image-1143" />

## What&#8217;s next?

All of this tools looked scary in the beginning, but have proved to be invaluable for me. I really recommend you try them out.

So I really recommend you find some tools you thought was scary and try them. Maybe you find your perfect tool.

And, don&#8217;t forget to actually do some work as well 😉

 [1]: http://sass-lang.com "SASS-Lang"
 [2]: http://gruntjs.com/ "Grunt.js"
 [3]: http://gulpjs.com/ "Gulp.js"
 [4]: https://nodejs.org/
 [5]: https://www.npmjs.com/package/gulp-autoprefixer "Gulp Autoprefixer at NPMJS.com"
 [6]: http://yeoman.io/ "Yeoman.io"
 [7]: https://travis-ci.org/ "Travis CI"
 [8]: https://github.com/andeersg/generator-drupal-module