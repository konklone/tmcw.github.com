---
layout: post
title: Thinking Static
categories:
- blog
---

What is the thinking behind static generation? That is, the idea of when
and how it's beneficial to do computation ahead-of-time rather than on pageload,
like a CMS would do.

![](http://farm9.staticflickr.com/8221/8327127545_0a47e9192c_b.jpg)

## Cost Curves

Static generation allows you to change the way that costs occur. This change
doesn't always equal _less_ cost, but it's about paying _different_ costs
at different times.

_Storage is cheap_, whether it's disk storage or services
like S3, and it tends to be cheap both for time and for space. Thus it doesn't
hurt too much to store content that's unlikely to be viewed.

_Computation is expensive_: despite the miracles of technology, processing
power and RAM still have bounds with power consumption, heating, and so on.
Services like EC2 allow you to slice this cost much thinner, reserving
instances for shorter periods of time - but keeping a big box on all the time
will still mean a big bill.

## Complexity

The _complexity_ of a problem decides whether it'll be solvable with
static generation. For instance, look at
[game complexity](http://en.wikipedia.org/wiki/Game_complexity). At first
glance, tic-tac-toe and chess appear to be the same sort of problem, but
tic-tac-toe has only 255,168 possible positions - in contrast to
chess's 10^47.

Consider then, a blog with 10 posts. A basic site would include ten
individual pages for posts, and one front page: 11 things to generate.
If the posts have tags - let's say eight different tags, then we'll need
to generate 10 post pages, a home page, and 8 tag listings.

How about combining up to two tags,
like [metafilter allows](http://ask.metafilter.com/tags/food+vegetarian)?

That'll be 8 tag pages, plus 10 post pages, a home page, and 56 [unique combinations](http://www.askamathematician.com/2010/04/q-how-do-i-count-the-number-of-ways-of-pickingchoosingtaking-k-items-from-a-listgroupset-of-n-items-when-order-doesdoesnt-matter/)
of ordered tags. It gets worse: with 20 tags, it would be 380 tag combinations.

## Chunks and Caches

In many cases, you can use estimation or a heuristic to greatly change the
type of complexity possible. Instead of generating infinitely many floating
point value solutions to a problem, you can generate only integer solutions
and round: this is the approach that grids, like [UTFGrid](https://github.com/mapbox/utfgrid-spec),
take.

You can think of this as filling a cache ahead of time, and you're limiting
the type and number of variables that can have values. For instance,
a map request with the WMS standard, designed for big, dynamic servers,
looks like

    http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs?
    service=wms&version=1.1.1&request=GetMap&width=512&
    height=512&srs=EPSG:3857&
    bbox=-12523442.7125,3757032.8137499997,-11271098.44125,5009377.085&
    layers=RAS_RIDGE_NEXRAD&format=image/png&transparent=true

While there are many things to complain about here, the clearest is the
`bbox` argument, which can contain any four floating-point numbers: so
practically infinite different values.

An OpenStreetMap tile, on the other hand, has a URL that looks like

    http://b.tile.openstreetmap.org/18/216249/112534.png

There are three variable parts here, and 68,719,476,736 potential values,
for zoom levels up to 18. That's a big number, but far short of infinity.

## Some Things Aren't Static

Finally, it's important to remember that making one part of the chain
static doesn't instantiate everything. If you're using a CDN, a fresh
site isn't in the cache yet. If data is on a hard disk, your disk caches
won't be hot yet. And everyone hitting a site for the first time has an
empty browser cache.

This isn't stated just for completeness: it actually affected MapBox
very significantly. EBS volumes
cloned from snapshots, for instance, are backed by S3 - lazily. The first reads on
them are extremely slow, to the point of being network-latency slow.

## Oh, Also, Clients

I've gone this far without mentioning Javascript. The lowly browser-programming-language
which got major backing and major speed boosts in the last few years made
client-side functionality more thinkable than ever before. It's what makes
[search on static data possible](http://macwright.org/2012/11/14/indexing-searching-big-static-data.html),
as well as lots of new visualizations.

That said, while generating stuff ahead of time works great with Javascript,
we're rarely 'porting' server code to client code. Like my post on searching
static data, there's cooperation between server and client which is always
necessary to deal with the realities of bandwidth and speed. That is to say,
design your APIs well.

## Designing for Static

Hopefully this has made static generation a little bit clearer. Once you've
got the concept, it starts turning up in unusual places, like materialization
in databases, and templates in programming. It's also useful to think about
making services static-able in the same way you think about making them
testable: as a design element.

### See Also

* [Using Jekyll and GitHub Pages for Our Site (developmentseed.org)](http://developmentseed.org/blog/2011/09/09/jekyll-github-pages/)
