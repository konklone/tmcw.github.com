---
layout: post
date: 2012-01-02 10:00:00 UTC
title: Longitude Over Time - The End of 2011
hn:
categories:
- blog
---

<small>(if the visualization below fails to load, try a modern browser
like Chrome, Firefox, or Safari)</small>

<iframe frameBorder='0' width='640' height='620' src='http://macwright.org/demo/up/'></iframe>

**Longitude over time is a travel map that replaces latitude with
time.** Here I'm using it with
my own travel data in order to see where I've been traveling,
at what frequency and for how long.

It's been
a continuing fascination to experiment with the few dimensions
we have in order to represent hidden information
in a natural way. Travel maps are typically disconnected with
the experience of traveling because positions are equally weighted -
I spent a long time in Colorado, but it's just another dot on a typical
map.

I first tried an 'orthographic 3D time cube',
but realized that it was
rather hard to understand, since the line extending out in space had no
good reference point and was only geographically understandable from one position:
looking straight down.

With a few months of data collected by
[Track Me](http://itunes.apple.com/us/app/trackme/id454704336?mt=8) and
converted into GeoJSON with  [ogr2ogr](http://www.gdal.org/ogr2ogr.html),
there was plenty of raw material. The graphic came together quickly
with a dash of [d3](http://mbostock.github.com/d3),
the visualization library to rule them all.

From there, a bit of [Modest Maps](http://github.com/stamen/modestmaps-js),
[Wax](http://mapbox.com/wax/) and [Easey](http://mapbox.com/easey)
with the beautiful [World Bright](http://tiles.mapbox.com/mapbox/map/world-bright)
tileset from MapBox do the trick for showing where, geographically,
I was.
