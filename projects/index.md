---
layout: post
title: Projects
---

At [MapBox](http://mapbox.com), part of [Development Seed](http://developmentseed.org), I've been working on [TileMill](http://tilemill.com), TileStream, [Wax](http://developmentseed.org/blog/2011/jun/10/wax-custom-advanced-ui-web-maps), and lots of other fun mapping-related projects. It's a cool job, and thus I'm not looking for work.

# Releases

<ul>
{% for post in site.categories.release limit:5 %}
<li>
{{ post.date | date: "%b %d, %Y"  }} &raquo; <a href='{{ post.url }}'>{{ post.title }}</a>
</li>
{% endfor %}
</ul>

# Software, downloadables

* [Easey](http://github.com/mapbox/easey) - easing transitions for Modest Maps
  ([homepage](http://mapbox.github.com/easey/))
* [Wax](http://github.com/mapbox/wax) - UI and common functionality for Modest Maps
  ([homepage](http://mapbox.github.com/wax/))
* [Sketch](https://github.com/mapbox/sketch) - fun vector drawing for Polymaps
  ([homepage](http://mapbox.github.com/sketch/))
* [Carto](https://github.com/mapbox/carto) - CSS-like styling for Mapnik
* [Heckle](https://github.com/tmcw/heckle) - a node.js project site generator
* [D&D](https://github.com/tmcw/dnd) - cross-browser, cross-platform drag & drop
  and sorting
* [node-get](https://github.com/tmcw/node-get) - a slightly higher-level HTTP
  library for node.js
* [node-banner](https://github.com/tmcw/node-banner) - a header generator for
  client-side distributed libraries
* [node-bloopsaphone](https://github.com/tmcw/bloopsaphone) - node.js bindings
  for the wonderful bloopsaphone project started by _why
* [Dead Sea](http://macwright.org/deadsea) - a tiny library for fixing web
  map zooming fail.

# Applications, websites

* [Your Superfund](http://macwright.org/superfund) is a project to improve
  mapping of America's Superfund sites. You can read about it on the accompanying
  [blog post](http://macwright.org/2011/10/30/voronoi-polygons.html).
* [A New Running Map](http://macwright.org/2011/07/28/mapping-runs.html) that
  got [on Runners World](http://othervoices.runnersworld.com/2011/08/the-art-of-the-run/)
  and [Fuck Yes Maps](http://fuckyesmaps.tumblr.com/day/2011/08/02), both of
  I was psyched about, being a reader of both.
* [Swem Signal](https://swem.wm.edu/um/swemsignal/),
  which lives on with the help of [Swem Library](https://swem.wm.edu/)'s awesome,
  inspiring staff. Librarians are cool people. It was a nice adventure - which spawned
  library locators at [UMass Dartmouth](http://www.lib.umassd.edu/libraryinfo/findmehere.html)
  and a [Facebook port](http://code.google.com/p/facebook-athenaeum/).
