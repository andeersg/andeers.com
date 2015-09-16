---
title: Configuring Varnish for WordPress
author: Anders
layout: post
permalink: /configuring-varnish-wordpress/
categories:
  - Development
tags:
  - varnish
  - Wordpress
---
[Varnish][1] is a very effective caching software, it can cache every part of your WordPress site. But when you turn it on you loose some nice features of WordPress.

Varnish works by sitting in front of your web server, and giving the visitor a cached version of your page if it has any, and only if there is no cached version available send the visitor to the web server.

But without some configuration you can&#8217;t access your admin area without going to the port your web server is listening (example.com:8080). The same for preview of posts.

**Disclaimer:** I don&#8217;t know everything about Varnish so something here may not be done in the recommended way. But for me it works.

*Note: If you just want the config scroll down to the bottom.*

## Step 1: default.vcl

Default.vcl is the configuration file for varnish, this is were you tell it what to do. This file is located in `/etc/varnish/default.vcl`. By default it is just a large file with commented out functions.

Since we want Varnish in front of the web server we must specify on what port our web server listens:

    backend default {
        .host = "127.0.0.1";
        .port = "8082";
    }

This tells Varnish that our web server is listening to port 8082.

## Step 2: sub vcl_recv

Sub vcl_recv is a varnish function, it responds to incoming request. This is the function where most of the stuff goes. We start by adding the client ip-address so that WordPress can read the users real ip-address.

    remove req.http.X-Forwarded-For; 
      set req.http.X-Forwarded-For = client.ip;
    

This is necessary if you use plugins such as [Limit Login Attempts][2].

This next step is important if you want to login to your site:

    if (req.url ~ "wp-(login|admin)" || req.url ~ "preview=true" || req.url ~ "xmlrpc.php") {
        return (pass);
      }

It also allows previews and xmlrpc requests.

This snippet strips away cookies unless your logged in to WordPress:

      if (req.http.cookie) {
        if (req.http.cookie ~ "(wordpress_|wp-settings-)") {
          return(pass);
        } else {
          unset req.http.cookie;
        }
      }

This works great for me, since i&#8217;m the only one logging in, but if you have a blog where users log in you probably want something else.

Then we unset cookies from files:

    if (req.url ~ "\.(gif|jpg|jpeg|swf|css|js|flv|mp3|mp4|pdf|ico|png)(\?.*|)$") {
        unset req.http.cookie;
      }
    

This way files are served without cookies which is good for speed.

At last we strip every get-parameter:

    set req.url = regsub(req.url, "\?.*$", "");

*Maybe you want to alter this if you need some get-parameters.*

That was everything in `sub vcl_recv`.

## Step 3: sub vcl_fetch

Vcl_fetch is a function that is called after a request is sent from the web server.

First we check if the user went to admin or login areas:

    if ( (!(req.url ~ "(wp-(login|admin)|login)")) || (req.request == "GET") ) {
        unset beresp.http.set-cookie;
        set beresp.ttl = 1h;
      }

If the user did not go to admin areas, or the request is a get-request, we unset the cookies and tell varnish to keep this request cached for 1 hour.

Next we tell Varnish how long it should cache files:

    if (req.url ~ "\.(gif|jpg|jpeg|swf|css|js|flv|mp3|mp4|pdf|ico|png)(\?.*|)$") {
        set beresp.ttl = 365d;
      }

My blog is fairly static, so i cache everything for a year. I&#8217;m not sure if that is the best way, but it works for me.

And that&#8217;s all in `sub vcl_fetch`. Now you are finished with the important part.

## Step 4: sub vcl_deliver

    sub vcl_deliver {
       if (obj.hits > 0) {
         set resp.http.X-Cache = "HIT";
       } else {
         set resp.http.X-Cache = "MISS";
       }
    }

When Varnish delivers content to the user it also adds a header telling if it was cached (HIT) or not (MISS).

## Wrapping things up.

If you followed my steps you should now have a working Varnish config for WordPress. And if you don&#8217;t want to go through the steps, here is the whole config:

    backend default {
        .host = "127.0.0.1";
        .port = "8082";
    }
    
    sub vcl_recv {
      if (req.http.host == "about.andeers.com") {
        set req.backend = aboutnode;
      }
    
      remove req.http.X-Forwarded-For; 
      set req.http.X-Forwarded-For = client.ip;
     
      if (req.url ~ "\.(gif|jpg|jpeg|swf|css|js|flv|mp3|mp4|pdf|ico|png)(\?.*|)$") {
        unset req.http.cookie;
        set req.url = regsub(req.url, "\?.*$", "");
      }
    
      if (req.url ~ "\?(utm_(campaign|medium|source|term)|adParams|client|cx|eid|fbid|feed|ref(id|src)?|v(er|iew))=") {
        set req.url = regsub(req.url, "\?.*$", "");
      }
    
      if (req.url ~ "wp-(login|admin)" || req.url ~ "preview=true" || req.url ~ "xmlrpc.php") {
        return (pass);
      }
    
      if (req.http.cookie) {
        if (req.http.cookie ~ "(wordpress_|wp-settings-)") {
          return(pass);
        } else {
          unset req.http.cookie;
        }
      }
    }
    
    sub vcl_fetch {
      if ( (!(req.url ~ "(wp-(login|admin)|login)")) || (req.request == "GET") ) {
        unset beresp.http.set-cookie;
        set beresp.ttl = 1h;
      }
    
      if (req.url ~ "\.(gif|jpg|jpeg|swf|css|js|flv|mp3|mp4|pdf|ico|png)(\?.*|)$") {
        set beresp.ttl = 365d;
      }
    }
    
    sub vcl_deliver {
       if (obj.hits > 0) {
         set resp.http.X-Cache = "HIT";
       } else {
         set resp.http.X-Cache = "MISS";
       }
    }
    

If you want to test your configuration for errors you can use this command:

    varnishd -C -f /etc/varnish/default.vcl
    

If you have errors, this command will give you a error message and the corresponding line number. If everything is okay it will print a lot of code (the generated config).

 [1]: https://www.varnish-cache.org/ "Varnish"
 [2]: https://wordpress.org/plugins/limit-login-attempts/ ""