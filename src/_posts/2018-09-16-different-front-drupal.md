---
title: Different front page for logged in users in Drupal 8
layout: post
permalink: /2018/09/different-front-drupal/
---

Sometimes we have the need to show logged in users something different than the regular visitors. It could be a dashboard for logged in users and a landing page for regular users. Or anything.

## How to solve it
At first I tried using the [configuration override system](https://www.drupal.org/docs/8/api/configuration-api/configuration-override-system) to override the front page setting, but this does not work. It looks like that setting cannot be overridden on a per user role basis.

I thought about checking the current user and if they are logged in redirect to `/dashboard`, but redirecting seems unnecessary for this.

So created a module with a route called `/front`, and my own controller with a method that looks something like this:
```
public function frontpage() {
  $current_user = \Drupal::/currentUser/();

  $output = [
    '#cache' => [
      'contexts' => [
        'user.roles',
      ],
    ],
  ];

  if ($current_user->isAuthenticated()) {
    $output[] = $this->userDashboard();
    return $output;
  }
  else {
    $config = \Drupal::/config/('custom_module.setup');
    $id = $config->get('visitor_front_page');

    $node = Node::/load/($id);
    if ($node) {
      $output[] = node_view($node);
      return $output;
    }
  }

	return ['#markup' => 'Something went wrong'];
}
```

First I check if the visiting user is logged in, and if they are I return the render array for a dashboard. If they are not logged in I load a node specified in my modules config and return this. If the node is not found I return a simple text.

### Improvements
You could extend the check to do different stuff based on the role or permission of the user. Maybe return better fallback content than in my example.

## Other solutions?
There is a beta version of the [Front Page module](https://www.drupal.org/project/front) that seems to provide this functionality, but it does not look ready yet based on the description.
