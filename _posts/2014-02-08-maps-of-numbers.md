---
layout: post
title: Maps of Numbers
categories:
- blog
---

Maps are made of numbers. Most of the time, these numbers are pretty simple:
latitude and longitude are pretty well-accepted systems for turning a place
like 'Washington, DC' into the numbers `38.9, -77.0`.

Latitude and longitude are simple at first glance: the Earth as a sphere, lined by 360°
of longitude values and 180° of latitude values. The first thing to break this
simple system is the Earth's elliptical shape: instead of being a sphere,
it's a little pudgy, about [42 kilometers](http://en.wikipedia.org/wiki/Equatorial_bulge)
of equatorial bulge.

To compensate, the most popular standard for storing latitude and longitude
values, [WGS84](http://en.wikipedia.org/wiki/World_Geodetic_System), contains
a pretty decent estimate of the Earth's shape.

WGS84 is a datum: a specific system for converting locations in numbers and
back. It's certainly not the only one: in order to store really accurate
locations - house locations up to the centimeter and beyond - surveyors
around the world created their own systems specialized to specific little
parts of land. Instead of applying to the whole sphere of the world,
local datums tend to be relative to a local point.

## Rethinking Datums

There's good reason to rethink datums: the advent of GPS measurements means
that an increasing number of recordings are sourced from satellites, rather than
lasers, benchmarks, and the other conventional tools of surveyors.

Datums are more often than not a nuisance and sometimes a blocker for
interoperability. Some [shift grids essential to reading geospatial data](http://trac.osgeo.org/proj/wiki/NonFreeGrids)
are non-free and non-distributable: you'll need to register for an account
and download extra files just to read any data in those datums.

For datums that are free, what happens in the guts of [proj4](http://trac.osgeo.org/proj/)
or your projection/datum implementation is still ugly: usually special projections
are stored in [hardcoded files](http://svn.osgeo.org/metacrs/proj/trunk/proj/nad/) and
loaded dynamically. So new datums can't be supported until everyone either downloads
shift grids from your website, or a patch is accepted and distributed
in a major piece of software.

## Problems for Interoperability

Technology tends towards standards at levels that benefit everyone where it
matters: while there have been contentious battles around video standards,
simpler levels like [TCP](http://en.wikipedia.org/wiki/Transmission_Control_Protocol)
and [UTF8](http://en.wikipedia.org/wiki/UTF-8) have attained near-universal
acceptance.

Standardizing datums, however, isn't subject to the same market forces. The
fractured world of geospatial formats and standards has benefited the creators
of 'proprietary' tools like [Esri](http://www.esri.com/) as well as the brokers
of standards like [Safe software](http://www.safe.com/).

[Vertical datums](http://www.region2coastal.com/sandy/abfe/vertical-datum) are
datums that just apply to elevation.
