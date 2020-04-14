---
title: "Drafts and scheduled publishing"
draft: true
date: 2020-04-14
tldr: How to enable drafts and scheduled publishing in 11ty.
permalink: /2020/04/draft-scheduled/
---
A nice feature I had in Jekyll was drafts and the option to schedule publishing of content.

In Jekyll you placed drafts in a separate folder called `_drafts` and when you built the site with the flag `--drafts` they where included.

I have gone a different way in my Eleventy site, and keep the drafts in the same folder (`_posts`) as the published content. To mark something as draft I add it to the front matter: `draft: true`.
Combined with that I have this function in `.elevent.js`:

Check out [this other post I wrote](https://andeers.com/2019/03/eleventy-essentials/ "Eleventy Essentials on Andeers.com") for how to handle the environment variables in Eleventy.

``` js
const drafts = (item) => {
  if (!eleventyVars.development && item.data.draft) {
    // If not development, and draft is true, skip it.
    return false
  }
  // Return everything by default.
  return true;
};
```
It's a filter function that skips drafts if the environment is not development.

## Scheduled publishing

For scheduling content I do a similar approach, I check the defined date vs the current date, and skip the item in production if it's in the future.

``` js
const future = (item) => {
  // If item date is before now it's safe to publish it.
  if (item.date <= now) {
    return true;
  }

  // If it's in the future we can publish it in development.
  if (eleventyVars.development) {
    return true;
  }

  // In future and not development, skip it.
  return false;
};
```

The scheduling check only works when the site is deployed/built. So I have used ifttt.com to automatically rebuild my website hosted on netlify.com each night.

## The complete solution

I have all of this in a helper function I use to generate the collection.

``` js
function getPosts(collectionApi) {
  const globs = [
    './_posts/*',
  ];
  const now = new Date();

  const drafts = (item) => {
    // See function above.
  };
  const future = (item) => {
    // See function above.
  };

  return collectionApi.getFilteredByGlob(globs)
    .filter(item => !!item.data.permalink)
    .filter(drafts)
    .filter(future)
    .reverse();
}
```
It's important that you add these checks to all collections you output, so your drafts are not published on the archive page or in the rss feed.

If you want to look at my whole code you can [check it out on Github](https://github.com/andeersg/andeers.com/blob/master/.eleventy.js "Andeers.com on Github").

## Possible changes

If you want to keep the drafts in a separate folder the `getPosts` function could be changed to include the drafts folder in the globs-array instead of checking the draft variable. I'm considering doing this my self.
