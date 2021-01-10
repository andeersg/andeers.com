---
title: "Setting up Nginx with PHP"
date: 2020-06-26
tldr: 
permalink: /2020/06/setup-nginx-php/
---
I'm not a server guy, but from time to time I have to setup a website for testing or development. Here are my steps for setting up nginx with PHP.

## Installing nginx

Installing nginx is straight forward:

```bash
sudo apt update
sudo apt install nginx
```

Next is to verify that the firewall accepts nginx.
```bash
sudo ufw status
```
If "Nginx HTTP", "Nginx HTTPS", or "Nginx Full" is not listed you have to add the ones you need (Full is https and http).

```bash
sudo ufw allow 'Nginx HTTP'
```

## Installing PHP

Using PHP with nginx requires PHP-FPM. If using Ubuntu 18, the repository must be added.

```bash
sudo apt-get update
sudo apt -y install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
```