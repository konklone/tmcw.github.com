---
layout: post
title: Repetitive Process
categories:
- blog
---

1. Find an open need
2. Google & search GitHub to find prior art, if any.
    - Someone got 80% of the way there: write a pull request instead
    - Read through their source and there's room for something else: do it
    - If it's going to be a module, check [npmjs.org](http://npmjs.org/) for namespace conflicts
3. `cd src`
4. `mkdir project`
5. `cp ~/bin/index.html .`
    - I use [this starting point file](https://gist.github.com/tmcw/5709949)
6. `v .`
    - which opens [MacVim](http://code.google.com/p/macvim/), installed with [Homebrew](http://mxcl.github.io/homebrew/),
      with [this .vim configuration](https://github.com/tmcw/.vim), aliased
      in [fish shell](http://fishshell.com/) with `alias v 'macvim'`
    - The most import tool in the vim configuration is [syntastic](https://github.com/scrooloose/syntastic),
      which helps to make JavaScript syntax constant
7. Split the window in [iTerm](http://iterm.sourceforge.net/) and run [serve](https://github.com/visionmedia/serve) in
   the other pane to preview
8. Write enough of `index.js` to get things running
9. If there are dependencies:
    - `npm  init`
    - `npm install --save dependency`
    - If this is a browser-based project with dependencies, [write
      a Makefile](http://bost.ocks.org/mike/make/) that runs [browserify](https://github.com/substack/node-browserify)
      [like this one](https://github.com/tmcw/leaflet-pip/blob/gh-pages/Makefile)
      and then run `watch make` in a tab in iTerm. The [watch command](http://beerpla.net/2007/08/04/watch-a-useful-linux-command-you-may-have-never-heard-of/)
      will run it every 2 seconds and `make` will noop unless there are changes
10. `git init .`
13. If the repository is something that lives on the web, `git checkout -b gh-pages` and
    only use the `gh-pages` branch for everything
11. Add files and a message for the first commit with [fugitive for vim](https://github.com/tpope/vim-fugitive)
12. `hub create`
    - Creates the repository `tmcw/project` with the [hub](https://github.com/defunkt/hub) utility
