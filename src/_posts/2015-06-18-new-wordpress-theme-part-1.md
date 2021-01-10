---
title: 'A new WordPress theme &#8211; Part 1'
author: Anders
excerpt: I have started on this new theme to improve my site and share the stuff I learn in the process.
layout: post
permalink: /new-wordpress-theme-part-1/
categories:
  - WordPress
---
I have for long wanted to improve my site. I was not happy with the old design and I felt like I had locked myself in a corner. The theme used a big banner image (inspired of Medium) and I never felt I could create a nice image for it.

And also the code was a mess and I was not motivated to improve it. So I decided to start working on a new theme. For months I have crawled the web looking for inspiration since I haven&#8217;t been sure what kind of style I wanted for this blog.

I also have a habit of not getting satisfied with my own private work (guess most developers are like that), so I decided that I should get the theme working, enable it and improve it afterwards.

So in this blog entry, and hopefully a couple of more I will document the stuff I have done to make this site better.

## Getting started with a theme

I use [_s][1] as a template/starting point so I know that I have best practice WordPress code as a base, then I set up my Gulp config.

In my `wp-config.php` I have added a constant:

<pre><code class="PHP">define('ENVIRONMENT', 'development');
</code></pre>

That way I can do this in my `functions.php` to automatically get the unminified CSS in development environments:

<pre><code class="PHP">if (ENVIRONMENT == 'development') {
  wp_enqueue_style( 'adams-style', get_stylesheet_directory_uri() . '/assets/css/style.css' );
}
else {
  wp_enqueue_style( 'adams-style', get_stylesheet_directory_uri() . '/assets/css/style.min.css' );
}
</code></pre>

And this technique can be used for javascripts and other &#8220;things&#8221; that should have different setups in development.

## Publishing it

I have put this theme on Github, you can look at it [here][2]. May plan is to create a develop branch, and keep the master branch like the live site at all times. I really like [this][3] Git workflow, and plan to use it for this theme.

So if you find any bugs or see room for improvements, feel free to create an issue or a pull request.

## What&#8217;s next?

I have a long list of stuff that needs to be fixed, here are some of them:

  1. Archive (I don&#8217;t like/want the pagination, so I must create some archive display)
  2. Icons (I want to use some icons for different stuff)
  3. Post types (Post types for image, link, maybe aside also)
  4. Speed optimization (I want this page to load fast and be effective, so optimizing CSS, JS)
  5. Server optimization (Find a good setup for Varnish and Nginx)
  6. Improve the theme in general (Styling)

I already feel that this approach as encouraged me to develop and write more.

 [1]: http://underscores.me/ "Underscores"
 [2]: https://github.com/andeersg/adams
 [3]: http://nvie.com/posts/a-successful-git-branching-model/