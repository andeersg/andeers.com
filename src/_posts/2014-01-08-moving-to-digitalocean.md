---
title: Moving my blog to DigitalOcean
author: Anders
layout: post
permalink: /moving-to-digitalocean/
sharing_disabled:
  - 1
categories:
  - Technology
---
I have been looking for another host for my blog for some time now, and in december i found DigitalOcean. I decided to move my blog there yesterday.<span style="line-height: 1.5em;"> </span>

## DigitalOcean

With DigitalOcean you get a server, a linux OS and then you are on your own. Luckily for people without server knowledge (me) they also have lots of guides for setting up various things. I spent my Christmas holiday configuring and trying different things before i decided to move it. Previously i had my blog on a Norwegian host which i found very limiting, i did not have ssh access and could not use tools such as Compass, Git or Node.js. This blog is now running on Nginx with Varnish in front of it. I have also experimentet with node.js, and have set up a Ghost blog.

## WordPress

I choose nginx for my wordpress blog mostly because i was curious and wanted to test it. This blog does not have so much traffic so i don&#8217;t think it was necessary for the user experience. But i like trying new stuff, and if nginx is faster than Apache there probably won&#8217;t be any large downsides (i hope).

## Ghost

Ghost is a new blogging platform created by [John O&#8217;Nolan][1], it&#8217;s a very minimalistic blogging platform stripped of everything but the essentials for writing. You write your posts with markdown and you have a live preview on your right side.

I must say i like messing around with the terminal and editing config files, so i think there may come  some posts about servers and setting up various stuff.

 [1]: http://john.onolan.org/ "John O'Nolan"