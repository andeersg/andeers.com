---
title: WordPress SEO and relative links
author: Anders
layout: post
permalink: /wordpress-seo-and-relative-links/
categories:
  - WordPress
tags:
  - seo
---
I really like [WordPress SEO][1], it&#8217;s a nice plugin that does everything I need for SEO. But for long I have had a problem with the sitemap feature. My posts did not show up in the post-sitemap.

I did not look into it anymore until today, when I looked through webmaster tools and figured I should get everything to work.

I opened `class-sitemaps.php` in the WordPress SEO plugin and started to go through the code.

At line 818 I found this snippet:

<pre><code class="PHP">if ( false === strpos( $url['loc'], $this-&gt;home_url ) ) {
  continue;
}
</code></pre>

For some reason this continue always triggered. At first I did not see what the problem was, since all my posts have urls. But then I realized (as you probably have guessed from the title) that all of them where relative links.

And WordPress SEO treats them as external links.

## The solution

The fix was quite easy. WordPress SEO have a alter hook right before this check, so with a small function in my `functions.php` I re-added the domain part of the url.

<pre><code class="PHP">function andeersg_fix_urls($url, $post) {
  if (substr($url, 0, 1) == '/') {
    return home_url() . $url;
  }
  else {
    return $url;
  }
}
add_filter('wpseo_xml_sitemap_post_url', 'andeersg_fix_urls', 10,  2);
</code></pre>

I do a small check to see that the first character is a forward slash so I don&#8217;t &#8220;fix&#8221; actual external urls if there are some of those.

And with that snippet enabled the sitemaps work again.

## The actual problem

I have a plugin called [Root Relative URLs][2] enabled, and that plugin removes the domain part from all urls.

I found [this blog entry][3] from Yoast, the team behind WordPress SEO that talks about how relative urls are not good. So I guess that may be the reason they treat relative urls this way.

I&#8217;m actually not sure why I have that plugin enabled, but I guess it has something to do with local development and broken/wrong image links.

Anyhow, disabling plugins that create relative urls will fix this problem, or you could use my code snippet. I will continue to use it until I know why I have that relative links plugin enabled.

 [1]: https://wordpress.org/plugins/wordpress-seo/
 [2]: https://wordpress.org/plugins/root-relative-urls/
 [3]: https://yoast.com/relative-urls-issues/