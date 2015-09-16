---
title: Writing CSS with ITCSS
author: Anders
layout: post
permalink: /writing-css-with-itcss/
categories:
  - CSS
tags:
  - bem
  - itcss
---
Inspired by Harry Roberts’ [talk about ITCSS][1] at Trondheim Developer Conference in October, i decided to use it for a redesign/optimization i was going to work on for a client at work.

## What is ITCSS?

ITCSS stands for Inverted Triangle CSS and is a way of structuring your CSS. The inverted triangle means that you start off in the wide end (low specificity) with base styling of html tags and the more you go down the triangle the narrower it gets and you have more specificity and complex rules.

  1. Settings &#8211; SASS/LESS variables and default values.
  2. Tools &#8211; Mixins and helper functions
  3. Generic
  4. Base
  5. Objects
  6. Components
  7. Trumps

The first two are only relevant if you use a preprocessor (and you should use a preprocessor), afterwards you place your reset/normalize, declare fonts and start on the selectors.

When you get to step 5 you start defining classes and writing CSS for specific elements.

But you can read more about the structure in [Harry Roberts’ slides][2], here i want to tell about my experiences while testing it.

## Something about the old site

The site i was going to work with suffered from almost three years of development and the CSS was a mess. There were no structure, so when a new feature was added it either was added to the end of some file, or in a new file appended at the end. At the end you almost had to search to find the parts you were going to work on.

And this was my main motivation to try to put everything into a system, so when i got the opportunity to rewrite this CSS, ITCSS was a logical choice.

## Getting started

I started with the main SASS file and just wrote down the steps of the triangle. The settings, base, tools and generic steps i created files for. Components, objects and trumps i created as folders since this is where most of the code would end up. Inside each folder i have a `_all.scss` file that contains all imports for this folder, by doing this the main SASS file is kept clean and tidy.

In this project the &#8220;object&#8221;-step was not used. We did not have any defined objects, so everything got sorted into the components step. I split things up into files like &#8220;buttons&#8221;, &#8220;form&#8221;, &#8220;header&#8221; and so on.

Rules for grid, clearfix, screen readers and visibility where put into the trumps step. They are put last so that no other class can mess with them.

## Combining it with BEM

BEM (Block, Element & Modifier) is a way of naming classes. And instead of nesting you have classes that tell the hierarchy. For example:

    .navbar {
    CSS-rules here.
    }
    .navbar__item {
    CSS
    }
    .navbar__item--active {
    CSS
    }
    

I feel like this approach is really good. And with SCSS you can “nest” it by using the `&amp;`:

    .navbar {
      &__item {
        &--active {}
      }
    }
    

This code will compile to the code in the previous example. So you can still “nest” in SASS to keep the working code organized, but the compiled code is flat.

[Here you can read more about BEM.][3]

## Problems?

This site was built with Drupal and the main problem was basically being able to add classes to all the elements i wanted (so the problem was not related to ITCSS at all). There were a lot of extra work because i had to create functions and use hooks to override Drupal.

## The result, and was it worth it?

Comparing the old site with the new site add cssstats.org we see that:  
Number of rules went from 506 to 703.  
Selectors went from 623 to 975.  
File size went from 77kb to 62kb.

I think one of the reasons there are so many more selectors is because of the bootstrap-grid. But also the redesign were more extensive.

The most interesting is when you look at the visualisation of the specificity graph:  
[<img src="/wp-content/uploads/2015/02/specificity.png" alt="specificity" width="600" height="407" class="aligncenter size-full wp-image-1096" />][4]

There have been major changes in the specificity of the CSS. And that is one of the goals of ITCSS.

While writing i felt i spent much more time moving and organizing the CSS than i would normally do, but i think i have much more control over the CSS now. I know where to go when i need to change something or add something new.

I really like it, and i’m going to continue to use it on my projects.

 [1]: http://vimeo.com/114965689 "Harry Roberts at TDC"
 [2]: http://csswizardry.net/talks/2014/11/itcss-dafed.pdf "The slides"
 [3]: http://www.smashingmagazine.com/2012/04/16/a-new-front-end-methodology-bem/ "BEM"
 [4]: /wp-content/uploads/2015/02/specificity.png