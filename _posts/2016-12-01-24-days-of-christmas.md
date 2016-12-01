---
title: 24 days of Christmas
layout: post
excerpt: December is here. Enter the advent calendars and gingerbread cookies. This Christmas I have decided to try to write a blog post every day. 
---
December is here. Enter the advent calendars and gingerbread cookies.

This Christmas I have decided to try to write a blog post every day. 
I haven’t made any specific plans on what to write about, but it will be related to web development, open source and productivity.

So to kick it off I want tell you about this small library I made at work. I had to import some documents from a Norwegian service that gives municipalities texts for services they are required to provide on their websites (quite the niche service).

“Surprisingly”, there was no open source library for this integration available in PHP, so I decided to [create one](https://github.com/andeersg/php-service-directory "PHP Service Directory"). I were going to use this integration in a Drupal 8 site, but decided to split out the library since the rest of the project is closed source.

Drupal 8 has really good composer support, so it’s very easy to include PHP libraries into Drupal. So now I have a composer package on Github that anyone can use, and a Drupal module that uses the library to integrate everything into Drupal.

Another benefit of separating the API and platform specific code is that multiple platforms can re-use the library. No need to reinvent the wheel and it may be easier for other people to contribute, since developers of Drupal, WordPress and other frameworks may want to use it.

The best thing about open source is that maybe someone else will have need for what you have made. The library I mentioned earlier is very specific, so maybe nobody will need it. But if a PHP developer is looking for a way to integrate with Norwegian service directory, there is a library for that.
