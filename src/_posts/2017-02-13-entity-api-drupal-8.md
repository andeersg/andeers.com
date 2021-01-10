---
title: Entity API in Drupal 8
layout: post
excerpt: A quick walkthrough of the most common entity operations in Drupal 8.
permalink: /2017/02/entity-api-drupal-8/
---

A quick walkthrough of the most common entity operations in Drupal 8.


## Changes from Drupal 7

Everything is different from Drupal 7, but if you really want to you can still use `[core_entity]_load` and `[core_entity]_load_multiple`. You should note that they are marked as deprecated in the code and will be removed (In Drupal 9), so you should just use the new ways right now.


## Load a node in Drupal 8

To load a node in Drupal 8 you have to use the Node class:

```php
use Drupal\node\Entity\Node;

$node = Node::load(1);
```

**Update:**
A good friend of mine [Zaporylie](http://github.com/zaporylie), told me of a better way of loading nodes (and other entities):

```php
$entity = $container->get('entity_type.manager')->getStorage('entity_type')->load($entity_id);
```

Doing it this way makes it easier to extend functionality and override original node class.

### Working with fields

To get values from your node you can either use some of the defined methods:

```php
$node→getTitle();
$node→getOwner();
// There are a lot more of these methods, and you can inspect the with dpm().
dpm($node);
// To see all methods just switch to the "Available methods" tab.
```

Or you can just specify the field name:

```php
$field = $node->field_name;
```

Most fields will be an instance of `FieldItemList`, but images and attachments for example will be of `FileFieldItemList`.

There are multiple ways you can get the field values, in this example the field is a formated text field (with format and value).

```php
// Array of values, if you don't have multiple values it will be an array with one item.
$value = $field->getValue();
echo 'My value is: "' . $value[0]['value'] . '", it uses the format: ' . $value[0]['format'];

// Or you can fetch a specific value, you specify the index for the value you want.
// This will return a field class instance.
$value = $field->get(0);
$value->value; // Text.
$value->format; // The format.
```

## Updating and saving entities

To update a node you can use the set method of the node class:

```php
$node->set('field_text', [
  'format' => 'full_html',
  'value' => '<p>Updated text is better than old text.</p>',
]);
```

You can also update values directly like this:

```php
$node->body->value = 'body';
$node->body->format = 'full_html';
```

But in my opinion it’s much cleaner to use the set method.

To actually store your changes you have to call the save method:

```php
$node->save();
```

## Creating a new entity

To create a new entity you have to use the static method create:

```php
$node = Node::create([
  'title' => 'My programmatically created node is amazing',
  'created' => time(),
  'changed' => time(),
  'type' => 'page',
  'langcode' => 'en',
  'uid' => 1,
  'body' => [
    'format' => 'full_html',
    'value' => '<p>Welcome to my node.</p>',
  ],
]);
```

And after creating the node object you have to save it with the save method.

## Deleting entities

Deleting a entity is quite easy. You just need to call the delete method.

```php
$node->delete();
```

## What's next?

There is a lot of functions available for the different entities, I really recommend you to look into the entity class file to see what methods are available.