---
layout: post
date: 2012-03-12 10:00:00 UTC
title: Project it Yourself
hn:
thumbnail: http://farm8.staticflickr.com/7055/6976982281_f6186cbcc0_q.jpg
categories:
- blog
- release
---

[Project it Yourself is a toy for creating, interpreting, and breaking map projections.](http://macwright.org/projectityourself)
I recently [gave a presentation about it to the DC Geo meetup](http://macwright.org/presentations/projections/#0).

_My posts on [understanding map projections](http://macwright.org/2012/01/27/projections-understanding.html)
and the [construction of the mercator projection](http://macwright.org/2012/02/02/rhumb-lines-great-circles.html)
are useful background for this one._

![twirl](/graphics/twirl_projection.png)

I think that [map projections](http://en.wikipedia.org/wiki/Map_projection) are poorly understood and oddly implemented. They're too
often [political statements](http://stuffwhitepeopledo.blogspot.com/2008/11/imagine-world-as-literally-eurocentric.html),
and [people bashing mercator](http://geocurrents.info/geographical-thought/uses-and-misuses-of-the-mercator-projection)
are looking for a
'new default' to adopt without thinking about the subject in depth.

And our computers understand them by codes, like `EPSG:900913`, stifling the
instinct to experiment with them or invent new ones. The projections you have
'to choose from' are limited by [the big list of projections](http://www.epsg.org/)
your computer understands,
and those you can bet on other computers having.

![rotated](/graphics/rotated_projection.png)

[Project it Yourself](http://macwright.org/projectityourself) is a first step towards
an alternative system, where we create projections, understand their implementations
and ramifications, and treat them as part of creating maps, rather than a
setting that's ignored.

It's not about 'adding more projections' or 'replacing [proj4](http://proj.osgeo.org/)'. While I really like
[kartograph](http://kartograph.org/), I don't think that snark about projection
choices is productive, or that just adding more options is the future. It's
a negative trend to talk about the tradeoffs of a projection like spherical
mercator without understanding the inherent balance between distortions.
This is the discourse because we don't implement projections, but we treat
them like they've always existed. The idea that projections are choices is broken.

![cassini tilt](/graphics/cassini_tilt.png)

Eventually I want the output of Project it Yourself to be generally usable - in a library
that you can use with [Modest Maps](http://modestmaps.com/), [Mapnik](http://mapnik.org/), and whatever other mapping library you have on hand.
It's not too far from reality: it'd be implemented as a langauge that's a strict,
safe subet of Javascript, only supporting numerical operations. The pet name for
the project is [numberlang](https://github.com/tmcw/numberlang), but there's not much to show
for it.

↬ [Bret Victor](http://worrydream.com/)'s [Inventing on Principle](https://vimeo.com/36579366)

↬ [Wikipedia](http://en.wikipedia.org/wiki/Main_Page)'s [concise projection definitions](http://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection)

↬ [spatialreference.org](http://spatialreference.org/) for making this mess more navigable

<div class='link-block'>
  <a href='http://macwright.org/projectityourself/'>Project It Yourself</a>
</div>
