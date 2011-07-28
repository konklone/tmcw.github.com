---
layout: post
date: 2011-07-28 10:00:00 UTC
title: A New Running Map
---

It's about time to make a revision of my old running map - something that I
threw together in February with a few scripts and an über-early version of
[TileMill](http://tilemill.com/).

<div id='ts-embed-1311863330573-script'><script src='http://tiles.mapbox.com/tmcw/api/v1/embed.js?api=mm&amp;size%5B%5D=640&amp;size%5B%5D=420&amp;center%5B%5D=-77.02936554908742&amp;center%5B%5D=38.92817802859384&amp;center%5B%5D=13&amp;layers%5B%5D=rrrr2&amp;options%5B%5D=legend&amp;options%5B%5D=zoompan&amp;options%5B%5D=tooltips&amp;options%5B%5D=zoomwheel&amp;options%5B%5D=zoombox&amp;options%5B%5D=attribution&amp;el=ts-embed-1311863330573'></script></div>

<div class='link-block'>
  <a href='http://macwright.org/running/'>see it on the big screen →</a>
</div>

I run with a
[GPS watch](https://buy.garmin.com/shop/shop.do?cID=142&pID=349) that
records heartrate, position, and elevation, and then can send it up to
[Garmin Connect](http://connect.garmin.com/), which used to be awesome until
[the original team left](http://news.ycombinator.com/item?id=1196996).
Right now, it's perfectly fine for my purposes, though it severely lacks
good export functionality - I'll address that later.

<div class='shutter-300'>
    <img src='http://farm5.static.flickr.com/4118/5443024281_f85b554589_z.jpg' />
</div>
<span class='image-credit'><a href='http://www.flickr.com/photos/tmcw/5443024281/in/photostream/'>the previous running map</a></span>

The main lack with the old map was that it represented my heart rate
with dots at each GPS trackpoint. That's easy to pull off, since it doesn't
require any postprocessing of the data, and the style in TileMill is as easy
to make - just scale dots.

Ideally I'd have something that more accurately represented what's happening -
I'm not running from circle to circle, but continually running, with smoothly
shifting variables of heartrate, speed, etc. Any info-nerd will know the
reference - the map of Napoleon's Journey, as drawn by
[Charles Minard](http://en.wikipedia.org/wiki/Charles_Joseph_Minard), uses
multi-width lines to represent troop numbers. Wikipedia claims that these are
[flow maps](http://en.wikipedia.org/wiki/Flow_map), though the term isn't
quite precise or established.

![Napoleon's Journey](http://farm7.static.flickr.com/6009/5968818040_7d5ff5c4c0_z.jpg)
<span class='image-credit'><a href='http://en.wikipedia.org/wiki/File:Minard.png'>Minard's Map</a></span>

I couldn't find many tools to do what I wanted to do, so
I had to build quite a bit. This time around I polished up my Garmin exporter
tool, which I'll call [disconnect.rb](https://gist.github.com/1098861) - a
[Ruby](http://www.ruby-lang.org/en/) script that uses
[mechanize](http://mechanize.rubyforge.org/) to simulate a browser - so that
private runs can be downloaded.

So, after downloading runs (never enough - 63 totalling 174 miles), it's time to
start thinking about making this crazy kind of map. I'm kind of starting from
scratch, so it will require some of the more difficult things in the world -
maths.

## Maths

__note: I'm not a real mathematician, I can only pretend to be one with a computer handy and lots of chances to get it right. If you've got corrections or improvements to this technique, note them in the comments!__

![Maths](http://farm7.static.flickr.com/6025/5970123765_fb34a63a68_o.jpg)

Okay! So, step one: we have all of the trace points, and can put them on a map.
This is the most normalized form of the data that will be - geographic libraries
tend to think of geographic features as basic building blocks - combining
10 points with lots of nice data into one line feature will give you only
one place to put data - in the line, not in its 'point components'. It's a
reasonable assumption, but makes some things difficult.

[OGR](http://www.gdal.org/ogr/)
is the bread-and-butter library for doing anything with vector data, and
[Shapely](http://trac.gispython.org/lab/wiki/Shapely) gives you nice higher
abstractions and a few geographical operations that are super useful. Both have
great bindings in [Python](http://www.python.org/), so that'll be the language
of choice.

![First map](http://farm7.static.flickr.com/6012/5970229953_f0733b82da_o.jpg)

So the geometry challenge is to create a variable-width polygonal
line from a series of dots and values? Imagining that the points are connected
by an invisible line, the challenge is to find an angle that's perpendicular
to the path at each point. Luckily, finding the angle between two points is
much easier with the [`atan2`](http://en.wikipedia.org/wiki/Atan2) function,
that not only figures out the angle, but puts it in the right quadrant. Just
watch out that it takes `(y, x)` parameters.

{% highlight python %}
from math import atan2

def angle(a, b):
    return atan2(
        a.coords[0][1] - b.coords[0][1],
        a.coords[0][0] - b.coords[0][0])
{% endhighlight %}

See? Very cool. It's simple enough to derive the atan2 function, but having
it 'just there' takes away a bunch of the annoying code-rewriting.

Next up - we've computed the angle at each line segment. Finding a tangent
line is as simple as averaging the segment 'before' and 'after':

<div class='image-cube'>
  <div>
  <img src='http://farm7.static.flickr.com/6009/5971507750_ee117bf871_o.jpg' />
  </div>
  <div>
  <img src='http://farm7.static.flickr.com/6006/5985364934_8d7db09993_o.jpg' />
  </div>
</div>

So now the idea is to project line segments out perpendicular to this vertex,
which is as simple as getting 90° angles on both sides, and then figuring out
the unit vector in those directions. To get the x and y coordinates of a
unit vector in a specific angle, you can just use trusty old `sin` and
`cos`.

{% highlight python %}
# now project outwards.
x = cos(e)
y = sin(e)
{% endhighlight %}

Then scaling the width of the line is as easy as multiplying the x and y
components of one of these unit vectors and then appending them to the original
point.

## Fudging Data

As with all data sources, GPS data isn't pretty when it's untreated.
Specifically, jitter - my relatively straight runs occasionally have
complete turnarounds in the data, or large deviations from the road centerline.
Classic [line simplification](http://bit.ly/qab4ji) doesn't help much here -
it's basically an algorithm that keeps differences rather than nixes them.

I went with the simplest algorithm that would work - a rolling average smooth.

{% highlight python %}
def average_smooth_n(x, n=5):
    weight = 0.7
    for i in range(n, len(x) - 1):
        before = x[i - n:i - 1]

        def get_x(m):
            return m[1].coords[0][0]

        def get_y(m):
            return m[1].coords[0][1]

        before_x = sum(map(get_x, before)) / (n - 1)
        before_y = sum(map(get_y, before)) / (n - 1)

        x[i][1].coords = [(
            x[i][1].coords[0][0] * weight + before_x * (1 - weight),
            x[i][1].coords[0][1] * weight + before_y * (1 - weight)
        )]

    return x
{% endhighlight %}

## Making Shapes

Finally, the question came up of how to actually turn these point-filled maps
into maps with actual polygons. This is where Shapely came in handy again: it has
some [handy logic](http://gispython.org/shapely/docs/1.0/manual.html#convex-hull)
for doing [convex hull](http://en.wikipedia.org/wiki/Convex_hull) calculations.
So even though I'm storing points in `left_points` and `right_points` arrays,
these points actually fall on different sides of the line based on the line's
angle. Shapely saves me from figuring this out - every four points are
constructed into a box, regardless of order.

## From Data to Map

Finally, I used [TileMill](http://tilemill.com) to render this data into
a semi-pretty map - as cute as my software-developer tendencies could do.
Props to [DC's open data initiative](http://data.dc.gov/) for background
data - buildings, water, parks, and roads - and
[Color Brewer](http://colorbrewer2.org/) for holding my hand through
choosing classy colors.

And to get from that map to the web, I posted my first map to my
bright and shiny [TileStream Hosting](http://mapbox.com/#/tilestream)
account, which now serves from the [MBTiles](http://mbtiles.org)


## Alternative paths

You could also 'just' combine runs of points into short line segments, assign
them a value, and use variable-width line strokes to produce something of the
same effect. That solution could never really solve the problem of being able
to join multiple widths and represent fluid changes that well. I'm also
really interested in the fact that this method leads to geographical features -
I've added multiple colors based on heartrate, but otherwise the result could
be converted into [GeoJSON](http://geojson.org) and used with
[polymaps](http://polymaps.org) or whatnot. I'm creating geographic data as
visualization, rather than an implementation-specific symbolizer.

## The Site

I built a [quick site to show off this map](http://macwright.org/running) which
only has one cool feature - instead of tooltips disappearing when you roll your
mouse over the line, they shift downwards on the page. If you run your mouse
along a line, then you create an ephemeral bar graph of the bpm measurements
along that line. It's a neat sort of incidental visualization, and also kind
of a cool psychological mimic behavior - you're more or less reenacting a thing
to take a measurement of it.

So check it out - it's a fun little experiment, hopefully to be followed by
a few more.

<div class='link-block'>
  <a href='http://macwright.org/running/'>Check out the finished product →</a>
</div>

_(full disclosure: I had something to do all of the
[MapBox](http://mapbox.com) tools I used, and I get a free TileStream
hosting account for working at [DS](http://developmentseed.org))_
