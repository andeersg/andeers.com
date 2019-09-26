---
title: 'Disable row in Drupal tableselect'
permalink: /2019/09/drupal-disable-tableselect-row/
tags:
  - Drupal
---
When you use the `tableselect` element there may be reasons you want to make a row not selectable:
- Permissions
- Missing properties on the element
- Or any other reason to not make a row selectable

I had to do this recently and thought it should be a easy thing to do, since all form elements seems to support the `#disabled` property.

A tableselect element looks something like this:

``` php
$form['table'] = [
  '#type' => 'tableselect',
  '#multiple' => FALSE,
  '#header' => [
    'name' => 'Name',
    'age' => 'Age',
  ],
  '#options' => $options,
  '#empty' => 'No items available',
];
```

And then each entry (in `$options`) would look like:

``` php
$options['anders'] = [ // knowing the key is important for disabling.
  'name' => [
    '#markup' => 'Anders',
  ],
  'age' => [
    '#markup' => 30,
  ],
];
```

You would think the way to disable a row is to just add `'#disabled' => TRUE;` to the option entry, but no, nothing happens.

To actually disable a row you would need to target the same key outside the `#options` array. Like this:

``` php
$form['table']['anders']['#disabled'] = TRUE; // Added directly to tableselect element.
```

In my opinion this is quite confusing.