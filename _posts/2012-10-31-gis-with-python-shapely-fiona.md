---
layout: post
title: GIS with Python, Shapely, and Fiona
hn:
categories:
- blog
---

Usually this blog is about things made here. This post isn't.

[Shapely](https://github.com/sgillies/shapely) and [Fiona](https://github.com/sgillies/fiona)
are essential Python tools for geospatial programming written by
[Sean Gillies](http://sgillies.net/). Use them instead of
[ESRI](http://www.esri.com/)'s Python toolchain. They are free,
stable, and mean you can post your code on [GitHub](https://github.com/) and
nonrich people will be able to run it.

Recently [Brian Timoney](http://mapbrief.com/2012/10/25/if-mapping-is-so-big-why-does-gis-feel-so-small/)
and [James Fee](http://spatiallyadjusted.com/2012/10/25/opengeoda-free-yourself/)
have been writing about how geospatial work is more and more programming
and less GUI-driven operations in the ArcGIS mold. They've been pointing a lot
to [Python](http://www.python.org/) for this.

[MapBox](http://mapbox.com/) doesn't use Python in any shipping code, though it
uses [Imposm](http://imposm.org/) for processing MapBox Streets. But I agree
that for GIS work and beginning programmers, it's the best thing around.

To make this a bit more concrete, here are some quick recipes of how to do
things with Shapely that I have recently done and may be useful.

## A Quick Note on Shapefiles

The [shapefile](http://en.wikipedia.org/wiki/Shapefile) are a historical format
that has outlived its term. I do not endorse them philosophically, but as they
are the lingua franca of most open source and closed source tools, and are
easily transmuted into anything with [ogr2ogr](http://www.gdal.org/ogr2ogr.html),
I will write about them as if they are okay.

## Turning Arbitrary Data into Geodata

Okay, so you have a CSV file with latitude and longitude values, and you want to turn
it into a Shapefile.
