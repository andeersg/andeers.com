---
title: Featured image as background image
author: Anders
layout: post
permalink: /featured-image-background-image-wordpress/
categories:
  - Technology
tags:
  - Image
  - Wordpress
---
If you have a theme with the custom background image feature enabled it&#8217;s pretty easy to replace it with the featured image of your posts.

First you need to add the `wp-head-callback`-attribute to your `add_theme_support('custom-background')`-function:

<pre><code class="language-php">add_theme_support( 'custom-background', array(
        'wp-head-callback' => 'change_custom_background_cb',
    ) );</code></pre>

This tells WordPress to use our function &#8220;change\_custom\_background_cb&#8221; to output the image.

## Switch to featured image

<pre><code class="language-php">function change_custom_background_cb() {
    $background = get_background_image();
    $color = get_background_color();
    if (is_single()) {
      $image = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'full' );
      if (isset($image[0])) {
      $background = $image[0];
      }
    }

    if ( ! $background &#038;&#038; ! $color )
        return;

    $style = $color ? "background-color: #$color;" : '';

    if ( $background ) {
        $image = " background-image: url('$background');";

        $repeat = get_theme_mod( 'background_repeat', 'repeat' );

        if ( ! in_array( $repeat, array( 'no-repeat', 'repeat-x', 'repeat-y', 'repeat' ) ) )
            $repeat = 'repeat';

        $repeat = " background-repeat: $repeat;";

        $position = get_theme_mod( 'background_position_x', 'left' );

        if ( ! in_array( $position, array( 'center', 'right', 'left' ) ) )
            $position = 'left';

        $position = " background-position: top $position;";

        $attachment = get_theme_mod( 'background_attachment', 'scroll' );

        if ( ! in_array( $attachment, array( 'fixed', 'scroll' ) ) )
            $attachment = 'scroll';

        $attachment = " background-attachment: $attachment;";

        $style .= $image . $repeat . $position; //  . $attachment
    }
?>
&LT;style type="text/css"&GT;
body.custom-background .site-header { &LT;?php echo trim( $style ); ?&GT; }
&LT;/style&GT;
<?php
}
?>
</code></pre>

The important part here is the first lines (4-9); we check if it&#8217;s a single post and if that post has a featured image, and if it has we replace the regular background image.

Another important part is the css line at the bottom. In my theme i use the background image on my header element, so if you want your image on another element you have to change this part: `body.custom-background .site-header`.

The rest of the function configures the css snippet according to the settings on the custom background page.

If you don&#8217;t want those there you can safely remove them and keep all the styling inside your css (but then you can&#8217;t change them from inside WordPress). [Read more about this at the WordPress Codex][1].

## What else can you do?

  * Have a folder of images? Display them randomly.
  * Display different images based on the time of day.
  * Or different images for different seasons.
  * Be creative <img src="http://andeers.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />

 [1]: https://codex.wordpress.org/Custom_Backgrounds