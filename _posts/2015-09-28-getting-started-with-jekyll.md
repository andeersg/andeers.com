---
title: 'Getting started with Jekyll'
author: Anders
excerpt: A small introduction to Jekyll and a guide to get you started with your own blog.
layout: post
categories:
  - Jekyll
permalink: /2015/09/getting-started-with-jekyll/
---

A couple of days ago I moved my blog from WordPress to Jekyll, a static site generator. Jekyll has a simple structure that allows for easy theming and styling.

In this post I will go through:

* What Jekyll is
* How to get started
* Features of Jekyll
* Hosting your site on Github

## What is Jekyll
Jekyll is a static site generator created by Tom Preston-Werner in 2008. It’s written in Ruby and compiles all your source files to a static HTML site.

Since it’s a static site generator you don’t need a database, so it’s fewer “things” to take care of.

And combining it with Github gives you a dead simple awesome blog engine. But more on that later on.

## Why should I consider Jekyll?
* **Fast**  
No database is needed, so when users visit you don't have to query and handle the data.
* **Simple**  
A folder with posts, a couple of layout files, and that is all you need.

## The setup
After you have installed Jekyll:

```
gem install jekyll
```

You can generate a sample site with the following command:

```
jekyll new awesome_blog
```

This command will generate a folder `awesome_blog` with a working Jekyll site inside.

To see your freshly generated site in action type:

```
jekyll serve
```

This will make your blog accessible from `localhost:4000` (if you would like another port you can add `-P 4242` to the command).

## The structure
* The main Jekyll file is called `_config.yml` and contains global settings and variables.
* All blog posts are located in the `_posts` folder.
* Layouts are located in the `_layouts` folder.
* Jekyll has builth-in support for SCSS, but more on that later.

Files and folders starting with an underscore will not be part of the generated site. Everything else will.

## SCSS
If you are familiar with Compass, Gulp og Grunt tasks this approach may look weird at first.

There are two folders `_sass` and `css`, and if you go the Sass folder you would expect a `style.scss` and some partial files. But in Jekyll the partial files are stored in the sass-folder, and the main sass file that imports them are located in the css-folder. Weird right?

These Sass files will be compiled automatically with the `jekyll build` or `jekyll serve` commands, but there is nothing that stops you from using your own CSS preprocessor and folder setup.

## Templates
Templates use a templating language called **Liquid**, if you are familiar with **Handlebars** or **Underscore.js** they are kind of similar.

A really simple index page could look something like this:

```html
{% raw %}
---
layout: default
---
<div class="home">
  <h1 class="page-heading">Posts</h1>
  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <span class="post-meta">\{{ post.date | date: "%b %-d, %Y" }}</span>
        <h2>
          <a class="post-link" href="\{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
        </h2>
      </li>
    {% endfor %}
  </ul>
</div>
{% endraw %}
```

The first part between the dashes is the YAML, and a funny thing I just learnt is that YAML is short for:

> **Y**AML **A**in't **M**arkup **L**anguage


"YAML is a human friendly data serialization standard for all programming languages."

We tell Jekyll that we want to use the default template located at `_layouts/default.html`.
There are a couple of variables you can add to the YAML to configure the output:
* permalink - Set the url where this post is located (will override the site setting)
* title - The post/page title should be added, this way it is available to the layout and can be displayed in the title tag.

## Includes
In Jekyll you have includes, you can think of them as reusable blocks of code.

In the starter theme the header and footer are includes. They are located in the `_includes` folder and are referenced like this:

```
{% raw %}{% include header.html %}
{% include footer.html %}{% endraw %}
```

Includes are great for things you repeat on multiple pages and across layouts.

## Writing posts
To write a post you simply:

1. Add a file to the `_posts` folder with the name pattern `yyyy-mm-dd-some-text.md`.
2. Start the file with the YAML block, and add a title and what layout you want to use.
3. Write your blog post with markdown (or html).
4. Run the build command or just look at the blog if you use the serve command.
5. Your first post is visible on your blog!

# Hosting on Github
A very cool feature of Github is that you can host your Jekyll powered website for free.

There are two ways you can set this up:

1. Create a repo called `username.github.io` and keep your Jekyll site in the master branch.  
Site available at `username.github.io`.
2. Create another repo and create a branch called `gh-pages`.  
Site available at `username.github.io/repo_name`.

If you have your own domain it's also very easy to use it. Just add a file called `CNAME` to your Jekyll folder with the domain you want to use.

Then you just have to point your domain to Github.

# Local development with Vagrant
I have created a [Vagrant](https://github.com/andeersg/jekyll-vagrant "Jekyll Vagrant") with Ruby and Jekyll that you can use if you don't want to hassle with Ruby on your local computer.

If you have Vagrant installed just do:

```bash
git clone https://github.com/andeersg/jekyll-vagrant jekyll
cd jekyll
vagrant up
vagrant ssh
jekyll new my_blog
cd my_blog
jekyll serve
```

# What next?
You could for example take a look at the [source code](https://github.com/andeersg/andeersg.github.io "Source of andeers.com") for this blog. Or you could visit [Jekyll's homepage](http://jekyllrb.com/ "Jekyll.rb") to get a more extensive look at Jekyll.

To learn more about hosting on Github I reccomend the [Github Pages site](https://pages.github.com/ "Github Pages").
