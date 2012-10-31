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
that for [GIS](http://en.wikipedia.org/wiki/Geographic_information_system)
work and learning programming, it's the best thing around.

To make this a bit more concrete, here are some quick recipes of how to do
things with Shapely that I have recently done and may be useful.

## A Quick Note on Shapefiles

The [shapefile](http://en.wikipedia.org/wiki/Shapefile) are a historical format
that has outlived its term. I do not endorse them philosophically, but as they
are the lingua franca of most open source and closed source tools, and are
easily transmuted into anything with [ogr2ogr](http://www.gdal.org/ogr2ogr.html),
I will write about them as if they are okay.

## Sidenote: Windows

A sidenote: this toolchain will barely work on Windows, but I'd strongly recommend
against it, and will not attempt to describe how to install this stuff on Windows,
since that road is certainly filled with version _(Windows 8, are you kidding me)_
bugs.

## Defining Terms

[Python](http://www.python.org/) is an open-source programming language. It
doesn't have anything to do with GIS itself, but has become one of the key
languages to use for GIS. This is mainly because it's very commonly available,
integrates well with the C++ code which forms the basis of a lot of GIS
functionality ([GEOS](http://geos.osgeo.org/), [Mapnik](http://mapnik.org/),
and [OGR](http://www.gdal.org/ogr/) are written in C++).

Shapely does _manipulating and analyzing data_. It'd based on GEOS, the standard
library for doing that kind of thing, that is very fast.

Fiona does _reading and writing data formats_. For this it uses OGR, the most
popular open-source conversion system. OGR is extremely powerful and
[supports many, many formats](http://www.gdal.org/ogr/ogr_formats.html) - it's
used by [Mapnik](http://mapnik.org/), a tile rendering engine, to support
more types of data, and used by people like me every day to convert formats.

The go-between is a really simple format called [Well-Known Text](http://en.wikipedia.org/wiki/Well-known_text)
and a slightly more efficient format called Well-Known Binary. This lets
Shapely worry about tricky spatial calculations and Fiona worry about tons
of file formats, and work together efficiently.

Why not use GEOS or OGR directly? GEOS, for one thing, doesn't provide bindings
to Python, so you'd need to use C++. You don't want to write C++ for data-munging
scripts. OGR does provide Python bindings, but they're extremely 'un-Pythonic' -
they don't behave like other things in the language, and they're very error-prone.

So, in a typical script, you would use Fiona for input and output, and use
Shapely for making and manipulating geodata. Got it? Let's go.

## Turning Arbitrary Data into Geodata

Okay, so you have a CSV file called `some.csv` with latitude and longitude
values, and you want to turn it into a Shapefile.

    name,lat,lon
    Chicago,41.88-87.63
    Kansas City,39.101,-94.584

First: grab the documentation to [Python's CSV reader](http://docs.python.org/2/library/csv.html).
It's a good one, and pretty simple to use. Using one of the code
examples on that page, you can make

{% highlight python %}
import csv
with open('some.csv', 'rb') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print row
{% endhighlight %}

Save this as `process.py`. Running `python process.py` yields the output:

{% highlight python %}
{'lat': '41.88', 'lon': '-87.63', 'name': 'Chicago'}
{'lat': '39.101', 'lon': '-94.584', 'name': 'Kansas City'}
{% endhighlight %}

Next up, making points. Import Shapely's [idea of a point](http://toblerity.github.com/shapely/manual.html#points)
with `from shapely.geometry import Point` and then make some - it takes
coordinates in longitude, latitude order, and since CSV is implicitly as
text rather than numbers, we use Python's `float()` function to convert:

{% highlight python %}
import csv
from shapely.geometry import Point
with open('some.csv', 'rb') as f:
    reader = csv.DictReader(f)
    for row in reader:
        point = Point(float(row['lon']), float(row['lat']))
{% endhighlight %}

Okay, now to save those points. Let's bring in Fiona, and save these points
to a shapefile.

{% highlight python %}
import csv
from shapely.geometry import Point, mapping
from fiona import collection

schema = { 'geometry': 'Point', 'properties': { 'name': 'str' } }
with collection(
    "some.shp", "w", "ESRI Shapefile", schema) as output:
    with open('some.csv', 'rb') as f:
        reader = csv.DictReader(f)
        for row in reader:
            point = Point(float(row['lon']), float(row['lat']))
            output.write({
                'properties': {
                    'name': row['name']
                },
                'geometry': mapping(point)
            })
{% endhighlight %}

Pretty simple, right? You define the kinds of features you're putting in,
`'Point'`, the properties they'll have, and then it's as simple as opening
an output file and calling `output.write` with a feature object.
