---
title: Creating patches for Git
author: Anders
layout: post
permalink: /creating-patches-git/
categories:
  - Technology
tags:
  - git
  - patch
---
Today i had to fix some bugs in a contributed drupal module in a project i&#8217;m working on, and to make sure my changes was not lost in a module upgrade i created a patch for them, and here is how i did it.

## What is a patch?

A patch is a single file which can contain modifications for multiple files. A patch can for example rename a variable in every file in your project.

## How do i do it?

The first thing you have to do is to clone the branch you want to patch:  
`git clone http://url.of.your.project.git`

*You don&#8217;t have to use git to create and apply patches, but here i use git.*

Then you go into your repo:  
`cd folder_name`

Next you can create a new branch for your modifications (i don&#8217;t know if this is necessary):  
`git branch my-awesome-patch`

Switch to the new branch:  
`git checkout my-awesome-patch`

Now you are good to go, and can code away. When you are finished with your changes and are ready to create the patch, commit everything in your branch.  
`git add --all` (Only use this if you want to add every modification you&#8217;ve made).  
`git commit -m "commit message"`

If you want to compare your changes against the original code you can type:  
`git diff [branch-name]` (The branch name is not the one you created but the existing one).

When everything looks great you can create the patch file:  
`git diff [branch name] > my-awesome-features.patch`

And voila, you have a patch file with all your modifications.

## How do i apply a patch?

`git apply -v [patch-name.patch]` (this will apply your changes).<figure id="attachment_991" style="width: 327px;" class="wp-caption aligncenter">


## Why patches?

Drupal uses patches for when people want to fix bugs or add features to modules. I think this is mainly because drupal.org doesn&#8217;t have forking and pull requests.

There are probably other uses for patches than this, maybe you want to fix some stuff from a development branch without merging in the whole branch.

Patching is not something i have used very much, but it was easy to understand and it may come in handy some day.