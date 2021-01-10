---
title: Optimizing websites
layout: post
excerpt: By using calc it's really easy to make elements use the full width of the page even if the rest of the site is centered.
permalink: /2016/06/optimizing-websites/
---
I have recently done some optimizations to my blog to improve the loading speed of it, and thought I should write it down, because a faster web-site is a happier web site.

If you want to take a closer look at the examples in this post you can take a look at my [website's repo on Github.com](https://github.com/andeersg/andeers.com "Andeers.com on Github").

## JavaScript

Every website that showcases code samples need some syntax highlighting, but not all pages have code, so loading the syntax highlighting library on all pages is unnecessary.

To optimize this I found a [simple lazy-load function](https://davidwalsh.name/javascript-loader "Lazyload script by David Walsh") created by David Walsh. It allows you to load CSS and JavaScript after the rest of the page has loaded. To only load prism.js when there is code to highlight I have this simple snippet

```javascript
if (document.querySelectorAll('pre').length) {
  load.js('/assets/js/prism.js', function() {
    Prism.highlightAll();
  });
}
```

## Fonts

If there is one thing page speed test complain about it’s web fonts. So to improve the performance of them I started with an article I found on The Filament Group blog about [optimizing font performance](https://www.filamentgroup.com/lab/font-loading.html "Optimizing font performance"). It suggested base64-encoding the font files and place them in separate CSS-files which then are lazy loaded. And that approach worked. If the web font took some time to load it was quite noticeable when the font switched from the fallback to the web font.

But then I came across this newer article from The Filament Group where they have found a better way by [using font events](https://www.filamentgroup.com/lab/font-events.html "Use font events for loading web fonts").

By using this approach you don’t have to base64-encode your font files or do anything else with the fonts. Just define them as usual in `@font-face`, and split your `font-family` declaration into two blocks, the regular body and one with a special class.

```css
body {
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
}
.loaded-fonts body {
  font-family: 'Ubuntu';
}
```

Then you can use a [FontFaceObserver library](https://github.com/bramstein/fontfaceobserver "Bram Stein’s FontFaceObserver script") to load the fonts and append the special class to your page. By doing it this way, the class is only appended to the page when the font is ready to use, so there should be no FOIT at all.

```javascript
if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
  if (localStorage.webfontsLoaded) {
    document.documentElement.className += ' loaded-fonts';
  }
  else {
    new FontFaceObserver( "Ubuntu" )
      .check()
      .then(function() {
        document.documentElement.className += ' loaded-fonts';
      });
    localStorage.webfontsLoaded = true;
  }
}
```

I choose to use a version of the FontFaceObserver library without a Promise polyfill. So if the visitor does not support Promises they get the fallback. I also store a variable in localStorage when the web font have been loaded, so the next page load we just use the web font immediately.

## Inline scripts

Since I don’t have that much JavaScript I didn’t want to have an extra JS-file. So all my JS is inline, and then I had the problem that if I had my Javascript un-minified it was not as optimized as possible, and if I minified it, it was not that easy to work with.

Since I use a static site generator it’s more limited what can be done compared to something like WordPress or Drupal.

I already have Gulp to preprocess Sass, so I looked for something to minify inline scripts and found [gulp-minify-inline](https://www.npmjs.com/package/gulp-minify-inline "Minify inline scripts with Gulp"). Next I created a folder `_pre_build` and configured Jekyll to ignore it.

```
exclude: [_pre_build]
```

Inside that folder I can put any file that exists in my Jekyll folder, like the `_includes/head.html` file I use for my `<head>` section.

In the `_pre_build` folder I can have html files with un-minified scripts and then let Gulp minify them and move them to the “real” folders that Jekyll uses.

```javascript
var minifyOptions = {
  jsSelector: 'script[data-minify="true"]',
  cssSelector: 'style[data-minify="true"]',
  js: {
  "vars": [ "load" ]
  }
};

gulp.task('minify-inline', function() {
  gulp.src('_pre_build/**/*.html')
    .pipe(minifyInline(minifyOptions)).on('error', function(err) {
      console.log(err);
    })
    .pipe(gulp.dest('./'))
});
```

## Future enhancements
Could I have done more? Absolutely. A lot of people split up their CSS into critical and non critical, and then inline the critical and lazy loads the non critical.

I should probably look into using a CDN like Cloudflare.
