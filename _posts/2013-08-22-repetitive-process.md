---
layout: post
title: Repetitive Process
categories:
- blog
---

![](http://farm6.staticflickr.com/5455/9564812531_f4db056347_b.jpg)

1. Find an open need<sup><a href='#open'>1</a></sup>
2. Google & search [GitHub](https://github.com/) to find prior art, if any.
    - Someone got 80% of the way there: write a pull request instead
    - Read through their source and there's room for something else: do it
    - If it's going to be a module, check [npmjs.org](http://npmjs.org/) for namespace conflicts: `npm search modulename`
3. `cd src`
4. `mkdir project`. Do not name your project yet.<sup><a href='#naming'>2</a></sup>
5. `cp ~/bin/index.html .`
    - I use [this starting point file](https://gist.github.com/tmcw/5709949)
6. `v .`
    - which opens [MacVim](http://code.google.com/p/macvim/), installed with [Homebrew](http://mxcl.github.io/homebrew/),
      with [this .vim configuration](https://github.com/tmcw/.vim), aliased
      in [fish shell](http://fishshell.com/) with `alias v 'macvim'`
    - The most important tool in the vim configuration is [syntastic](https://github.com/scrooloose/syntastic),
      which helps to make JavaScript syntax constant
7. Split the window in [iTerm 2](http://iterm.sourceforge.net/) and run [serve](https://github.com/visionmedia/serve) in
   the other pane to preview
8. Write enough of `index.js` to get things running
9. If there are dependencies:
    - `npm  init` leads you through creating a `package.json` file for [npm](https://npmjs.org/)
    - `npm install --save dependency` both installs a dependency and saves it in your `package.json` file.
    - If this is a browser-based project with dependencies, [write
      a Makefile](http://bost.ocks.org/mike/make/) that runs [browserify](https://github.com/substack/node-browserify)
      ([example](https://github.com/tmcw/leaflet-pip/blob/gh-pages/Makefile))
      and then run `watch make` in a tab in iTerm. The [watch command](http://beerpla.net/2007/08/04/watch-a-useful-linux-command-you-may-have-never-heard-of/)
      will run it every 2 seconds and `make` will noop unless there are changes
10. `git init .`
11. If the repository is something that lives on the web, `git checkout -b gh-pages` and
    only use the `gh-pages` branch for everything<sup><a href='#gh-pages'>3</a></sup>
12. Create a README. A good readme has:
    - A 2-4 sentence English description of what the thing can do for you and
      why you would want it. Note: not _how_ it does what it does or,
      _what it is_, but _what it does for you_. Software is a thing you use.
    - An example that steps through requiring the thing, doing something useful
      with it, and integrating this with the outside world. Examples are not
      random examples of how you would use functions: they are examples
      of how things fit together.
    - API documentation for all public methods, which describes inputs,
      outputs, expectations, and behaviors.
    - A 'See Also' section if this project has open-source brothers and sisters,
      or took heavy inspiration from some other project or paper.
    - READMEs _do not_ need to include the software license (this can be in
      LICENSE, nor the name of authors (this is in `package.json` and the commit
      history), nor TODOs (this is in your issue tracker or code). READMEs
      are about present code, not people, laws, or plans.
13. Add files and a message for the first commit with [vim-fugitive](https://github.com/tpope/vim-fugitive)
14. `git create`
    - Creates the repository `tmcw/project` with the [hub](https://github.com/defunkt/hub) utility
15. `npm publish` to publish the first version of the module
16. When you've gotten to fixing issues, create an issue for every problem,
    and create commits in vim-fugitive, using [vim-rhubarb](https://github.com/tpope/vim-rhubarb)
    to reference and [close those issues](http://imgur.com/P5dt1YR) from commit messages.
17. Once the thing _works_, read over everything, install it and test it. If
    it's a library that isn't totally self-explanatory
    _don't release it without releasing something that demonstrates why it is interesting_,
    whether that's another piece of software or just something in `examples/`.
    Do not fall into the trap of undemonstrated potential: connect the dots
    and prove worth.

---

<ol>
<li id='open'>**an open need**: a finite need that people have. People can be just
you, but it should not be just you just right now: the impact of technology
is people × time.</li>
<li id='naming'>**do not name your project yet**: registering domain names
for projects before they have code on the ground has cursed every single one.
and if your project is code, you <em>do not know what it will be yet</em>:
it could be one piece, a lot of parts, or just documentation and a blog post.</li>
<li id='gh-pages'>**use gh-pages for everything**: you don't _need_ a master branch.
If something else is default, people will clone that by default, automatically.
`gh-pages` is just like `master`, except with perks: automatic, free web hosting.</li>
</ul>
