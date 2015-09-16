---
title: 'Grunt &#8211; The JavaScript task runner'
author: Anders
layout: post
permalink: /grunt-javascript-task-runner/
sharing_disabled:
  - 1
categories:
  - Development
tags:
  - JavaScript
---
Grunt is a command line tool that&#8217;s running tasks for you. It can automate all the things you have to do manually (at least many of them).

You can for example make it compile your SASS-files, check your JavaScript syntax, combine the JS-files and minify them with **one** command.

## What is Grunt really?

In itself Grunt does nothing, you have to add plugins to actually do stuff. Right now there are over 2000 plugins at [GruntJS.com][1].

You have a file where you define the plugins you want to use, which folders they should work on and what you want them to do. You can define multiple environments and have the plugin to different things.

## My configuration

I have structured my Grunt tasks for web development and i have plugins for Compass(SASS), validating JS, merging JS-files, minifying JS and optimizing images. I also use a plugin called Grunt Watch that watches my files and run the tasks when files are changed, something like &#8220;compass watch&#8221; only it works for all the files.

When i have this setup i can work in smaller files and keep my development environment organized. As i work Grunt compiles my css and javascript-files and optimizes my images.

## Alternatives

Until now have i used [CodeKit][2], a Mac desktop app that does most of the tasks i have described here. CodeKit monitors folders and can merge JavaScript, CSS and check JS-files for syntax errors. I like CodeKit very much, but it was annoying that i could not use it on remote servers.

Recently another JavaScript task runner has appeared, it is called [gulp.js][3] and is supposed to be much faster than Grunt. I have not tried gulp.js yet, so i cannot say to much about it, but it looks cool and i&#8217;m going to check it out.

## Example

Here is a part of my Gruntfile.js (the file you define what tasks you want to execute):

    
    module.exports = function(grunt) {
      grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
          options: {
            separator: ';'
          },
          dist: {
            src: ['dev/js/*.js'],
            dest: 'assets/js/script.min.js'
          }
        },
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
          },
          dist: {
            files: {
              'assets/js/script.min.js': ['<%= concat.dist.dest %>']
            }
          }
        },
        jshint: {
          files: ['Gruntfile.js', 'dev/js/*.js'],
          options: {
            globals: {
              jQuery: true,
              console: true,
              module: true,
              document: true
            }
          }
        }
      });
    
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-concat');
    
      grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    
    };
    

In this file i have defined what plugins to use, i have registered the default task (what happens when you write &#8220;grunt&#8221; in the terminal), and i have told the different plugins where my files are and what i want them to do.

 [1]: http://gruntjs.com/plugins
 [2]: https://incident57.com/codekit/
 [3]: http://gulpjs.com/