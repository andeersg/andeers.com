---
title: "How to update to Drupal 9"
permalink: "2020/06/update-drupal9/"
tldr: How to update an Drupal 8 site to Drupal 9 with Composer.
---
[Drupal 9](https://www.drupal.org/project/drupal/ "Drupal 9 on drupal.org") was launched this week. So if your modules are ready it's time to update.

Updating betweeen major versions can be tricky, sometimes Composer won't update a package because another package have a common dependency, but with another version.
And sometimes the conflicting package is the one you try to update.

That happened to me when I tried to update `drupal/core` from **8.8.6** to **9.0.0**.

Drupal 9 required a version of a package that was not compatible with Drupal 8, and that stopped Composer from updating.

## Are you ready?

I recommend using the [Upgrade Status](https://www.drupal.org/project/upgrade_status "Upgrade Status on drupal.org") module to check if your site is ready for Drupal 9. It can scan both custom modules and contributed moduls for problems. 

Be aware that unsupported modules won't stop composer from updating, so you could crash your site by updating if some of your code is not compatible.

## My solution

Here are the steps I did to update. My project was made from [Drupal Project](https://github.com/drupal-composer/drupal-project/ "drupal-project on github.com") and contained `drupal/core`, `drupal/core-dev` and `drupal/core-composer-scaffold`, all with `^8.8.6` as the version.

First I updated `composer.json` without actually running the updates:

``` bash
composer require drupal/core-recommended:^9.0.0 drupal/core-composer-scaffold:^9.0.0 drupal/core:^9.0.0  --update-with-dependencies --no-update
composer require drupal/core-dev:^9.0.0 --dev --update-with-dependencies --no-update
```

Since it's a new major version, `composer require` is needed instead of update. The option `--update-with-dependecies` makes composer update dependecies of the specified packages. `--no-update` prevents Composer from actually updating the packages.

Then it should be safe to run 

``` bash
composer update
````

After this you should remove `drupal/core` since `drupal/core-recommended` is installed.

``` bash
composer remove drupal/core
```

And that's it, run database updates and enjoy Drupal 9.