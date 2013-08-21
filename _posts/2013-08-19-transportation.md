---
layout: post
title: Transportation
categories:
- blog
---

<iframe width='640' height='400' frameBorder='0' src='http://a.tiles.mapbox.com/v3/tmcw.all_stops.html#10/38.9081/-77.0087'></iframe>

_Washington, DC has a startling number of bus stops - in the view of the
WMATA API, we have 11,316._

[![Daily Bus Supply](http://farm6.staticflickr.com/5464/9507634971_22a17fa8e0_o.png)](http://www.flickr.com/photos/tmcw/9507634971/sizes/o/in/photostream/)

_Anywhere from zero to four hundred buses are on the road at any moment.
Gaps are mostly due to the wmataapiapi instance starting to sleep,
but the falloff at midnight I think is WMATA shutting off tracking._

<a href='http://imgur.com/ESPtf1p'><img src='http://i.imgur.com/ESPtf1p.gif' width=640 height=640 /></a>

_Buses flowing through the system._

[![](http://farm4.staticflickr.com/3811/9514589855_3a20ccc969_b.jpg)](http://www.flickr.com/photos/tmcw/9514589855/)

_Speed over time for the length of all routes._

![](http://farm8.staticflickr.com/7328/9539486951_32a32c5501_o.png)

_x:routes / y:stops_

## Code

I started to hack away at the problem by building [wmataapiapi](https://github.com/opentransitdc/wmataapiapi)
and hosting [a testing instance](http://secret-wildwood-1777.herokuapp.com/) on [Heroku](https://www.heroku.com/):
a simple layer that tries to do a v2 API on top of what exists now:
it's faster, supports [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing),
has no user limits, and transmutes some XML-encoded responses into [JSON](http://www.json.org/)
for simple client-side parsing.

Like other problems, I see this as having a small, blocking core. In this case,
the official API isn't very good, and that limits what you can do with it and more
importantly imagine doing with it.

For a week and a half, I added and activated a history mode that dumped
minutely bus positions to [Amazon S3](http://aws.amazon.com/s3/). The intent
is to provide data for research, testing, and visualization. You can download
[this data to run similar analyses](https://cloudup.com/c25MkNrmpR1).

--

This is a bit of a diversion for me, an excuse to crack open another
encapsulated complexity in life. [Brandon Martin-Anderson](http://bmander.com/),
[Eric Fischer](http://www.flickr.com/people/walkingsf/), and
[David Alpert](http://greatergreaterwashington.org/alpert/) know more and
think more about this kind of thing. [Axis Maps](http://www.axismaps.com/) also
made a [beautiful visualization in this vein](http://bostonography.com/2011/an-mbta-bus-iness-day/).
