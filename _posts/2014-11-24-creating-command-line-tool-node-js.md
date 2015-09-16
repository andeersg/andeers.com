---
title: Creating a command line tool with Node.js
author: Anders
layout: post
permalink: /creating-command-line-tool-node-js/
categories:
  - Development
tags:
  - node.js
---
Command line tools are always useful. They can help you do stuff faster and be more productive. And with Node.js it&#8217;s really easy to create them yourself.

The easiest command line tool may be something like this:

    #!/usr/bin/env node
    console.log(process.argv);

  * The first line tells that it&#8217;s Node that should be used for this.
  * The second line just outputs every argument back to you.

To make this work just type `node index.js arg1 arg2 arg3` and your console will print:

    ['node',
      '/path/to/js/file',
      'arg1',
      'arg2',
      'arg3']

## Slightly more advanced

If you want to make it even more like a command line tool:

  * Rename it to cmdtool (without the .js ending).
  * Make it executable (sudo chmod +x cmdtool)

Then we can do the same as before, only we now just need to type `./cmdtool arg1 arg2 arg3` and the result will be the same.

## Fancyness increasing

To make it even more fancy either put your script in `/usr/local/bin` or make a symlink to it from there (`ln -s /source/cmdtool /usr/local/bin/cmdtool`).

Then you can just type `cmdtool arg1 arg2` without anything extra for the real command line feel.

So now we have a working command line tool with input arguments. Now you could go on and loop through the arguments and parse them for option flags and input and everything yourself, or you could use a node.js package made for this.

## Commander reporting for duty

I have tried a package called [commander][1] that&#8217;s really easy to setup. Here is an example:

    #!/usr/bin/env node
    
    var program = require('commander');
    var chalk = require('chalk');
    
    program
      .version(require('./package.json').version)
      .usage('<path to file> [options]')
      .option('-o, --output [type]', 'Add output format [html, csv, json]', 'html')
      .option('-s, --screen', 'Add this to output file to console instead of creating file')
      .option('-f, --filename [filename]', 'the output filename');
    
    program.parse(process.argv);
    
    if(!program.args.length) {
      console.log( chalk.red('n No input file specified.') );
      program.help();
    }
    if (program.filename) {
      console.log(program.filename);
    }
    else {
      console.log('No filename specified.');
    }
{: .language-javascript}

This code snippet actually requires two packages, commander and chalk. Chalk makes it easy to output text in different colors, like red for errors.

The first part of the code defines options and format of the command line tool.

  * The usage line is a textual way to describe how the program works.
  * The option lines is different options, with a short syntax, full syntax, helping text and optionally a default value.
  * `program.parse` reads input (like we did with console.log in the first example).
  * Next we check if there are any arguments, and if there isn&#8217;t we show an error and print the help (usage + options).
  * Next we can check for the values of the different options and use them in our script.

So there we have a working command line tool, now you can make something awesome. And also, with NPM you can publish your scripts to [npmjs.org][2] so other people (and yourself later) can install it with `npm install -g cmdtool`. This will put your script in a &#8220;bin&#8221; and make it executable for you.

I haven&#8217;t tried publishing to npm yet. But you basically just type `npm publish` with some arguments and stuff in your package.json file. You can [read more about it here][3].

And if you make something cool, leave a comment!

 [1]: https://www.npmjs.org/package/commander
 [2]: https://www.npmjs.org
 [3]: https://www.npmjs.org/doc/cli/npm-publish.html