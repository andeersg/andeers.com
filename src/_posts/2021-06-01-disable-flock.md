---
title: How to disable FLoC on Netlify
tldr: ""
permalink: 2021/06/disable-floc/
---
FLoC is Googles next attempt at tracking people online. You can read more about it in this [nice article](https://adactio.com/journal/18046 "Get the FLoC out ") by Adactio.

Both [WordPress](https://make.wordpress.org/core/2021/04/18/proposal-treat-floc-as-a-security-concern/ "Proposal: Treat FLoC like a security concern") and [Drupal](https://www.drupal.org/project/drupal/issues/3209628 "Add Permissions-Policy header to block Google FLoC") are discussing if they should disable it by default.

> In the meantime, if you’re a website owner, you have to opt your website out of the origin trial.

Do opt out of it on Netlify all you have to do is add some lines to your `netlify.toml`:

```
[[headers]]
    for = "/*"
    [headers.values]
        Permissions-Policy = "interest-cohort=()"
```

This will add a header to your website that will tell Google Chrome that your website don't want to participate. It may not be necessary, but it's an easy fix.