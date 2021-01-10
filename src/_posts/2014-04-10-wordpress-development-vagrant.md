---
title: WordPress development with Vagrant
author: Anders
layout: post
permalink: /wordpress-development-vagrant/
sharing_disabled:
  - 1
categories:
  - Technology
tags:
  - vagrant
---
[Vagrant][1] is a tool for creating virtual development environments. It allows you to setup a environment with the OS you want and all the functionality you want without messing with your computer.

## Why vagrant?

Up until recently i used [xampp][2] on my mac to setup local sites. It works pretty good, but sometimes there were trouble like when some tools did not understand which php they should use (xampp or osx), and stuff like that. With vagrant everything happens inside a sandbox and your computer is left alone. You&#8217;re also more certain everything will work on your server if the development environment is the same.

I really like that you can install everything from web servers to database engines and not risk messing with OSX (or Windows).

## How does Vagrant work?

Vagrant installs a operating system and executes a file containing commands `bootstrap.sh`. Inside this file you can tell Vagrant to install Apache, MySql, PHP, Node.js, Git and so on.

You can remove your virtual machine by typing `vagrant destroy`, or temporary disable it by typing `vagrant halt`.

## Want to try it?

I have created a [repo at Github with my setup][3], check it out and try for yourself. This vagrant installs Ubuntu 12.04, nginx, Mysql, PHP, Git, Node.js (with Grunt and Gulp), and WordPress 3.8.

 [1]: http://www.vagrantup.com/ "Vagrant"
 [2]: https://www.apachefriends.org/index.html "XAMPP"
 [3]: https://github.com/andeersg/simple-wordpress-vagrant "Simple WordPress Vagrant"