---
title: The CSS Widows
permalink: /2019/01/css-widows/
---
If you are like me you have probably been annoyed when your editor autocompletes `wid` to `widows` and you wanted `width` or something similar.

I have always wondered why my editor is not smarter, since this is something I have never used. And I have to admit that up until I started writing this I have thought it said `windows`.

But the last time I saw it I had more time and started to wonder. What does it do?

## What are widows?

The word comes from print, and references the last line of a paragraph if ends up on a new page. If on the other hand a paragraph starts at the very bottom of a page (and continues on the next) it's called a orphan.

>The widows CSS property sets the minimum number of lines in a block container that must be shown at the top of a page, region, or column.  
<cite>[Widows at developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/CSS/widows)</cite>

In CSS this can work on not only print, but also CSS columns.
It works the same way in CSS, you control how much of a block (typically a paragraph) will continue on the next page/column before the whole block follows over.

## Example

```css
/* Apply the widows property to the parent element of paragraphs. */
.paragraphs-container {
  widows: 2;
}
```

And thats everything you need. If the page breaks or the text spans across multiple columns no more than two lines of a paragraph will continue over to the next page/column.