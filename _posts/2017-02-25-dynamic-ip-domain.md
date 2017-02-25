---
title: Use DigitalOcean and home computer to update domain IP
layout: post
excerpt: With DigitalOcean API you can easily point a domain to a computer at home so you can access it from everywhere.
---

Using DigitalOcean(DO)'s API, a domain and a script on your home computer, you can have a subdomain pointing to your home network all the time.

If you just want the script, here it is (remember to to replace `[token]`, `[domain]` and `[record_id]`):

```
#!/bin/bash

PUBLIC_IPV4=$(curl ifconfig.co)

curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer [token]" -d '{"data":"${PUBLIC_IPV4}"}' "https://api.digitalocean.com/v2/domains/[domain]/records/[record_id]"
```

Put this script with your values somewhere inside your network and call it from time to time and you should be good to go.

For more details, please read on.

## Prerequisites

To set this up you need the following:

1. Configure your domain to use DigitalOcean's name servers
2. Create a A-record for your subdomain and point it to your external IP ([What is my IP?](https://ifconfig.co/ "ifconfig.co"))
3. Generate a API token in the dashboard at DigitalOcean

## Find the domain record id

As far as I've seen, is there no way to find the domain record id from the web interface. So the easiest solution is to use their API and the terminal.

If you execute the following script (with replaced values):

```
curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer [token]" "https://api.digitalocean.com/v2/domains/[domain]/records"
```
You will get back a JSON object will all entries for your domain. In here you will find the id.

## Run the script automatically

Since you don't want to run this script manually, we should set up some automation. This differs from OS to OS, but here are some options:

### Linux

If you have a Raspberry Pi or some other computer with a linux OS you can use [cron](https://www.wikiwand.com/en/Cron "Cron"):

```
0 * * * * /path/to/script/update_digital_ocean.sh >/dev/null 2>&1
```

This example will run `update_digital_ocean.sh` every hour and not generate any output. You can use this [generator](http://crontab-generator.org/ "Crontab Generator") to create your script.

To configure it on your computer type `crontab -e` inside your terminal to open the crontab file. Here you can just copy in your line at the end of the file and save.

### OSX

Apple don't use cron anymore, they use something called *launchd*. I'm not that familiar with it, but found this [launchd-generator](http://launched.zerowidth.com/ "Launchd Generator") you can use to create a launchd.plist file.

After you generate a file this website also tells you where to place it.

### Windows

For Windows I really don't know (I'm sorry), but I found [this StackOverflow thread](http://stackoverflow.com/questions/132971/what-is-the-windows-version-of-cron "StackOverflow thread about cron") that has an answer which lists a couple of tools for different versions of Windows.

## Why is this necessary?

Most internet providers don't give you a static IP at home, so your IP address may suddenly change. This will break your domain and you will not be able to connect anymore.

This script will update the domain with the correct IP every time it's executed.

## Remember to configure your router

Even if your domain points towards your home, you will have to do some changes to the router configuration to be able to serve websites or connect with SSH.

If you want to serve a webpage at port 80, you need to port forward external port 80 to the local IP of your computer. The same for every other port you want to use.

## Ideas for what you can do with it

* Set up [Home-Assistant](https://home-assistant.io/ "Home-Assistant")
* Some torrent clients have a web ui, you could access it from everywhere and manage your downloads
* Enable SSH access to your computer
* Probably you could run a Minecraft (or many other games) server