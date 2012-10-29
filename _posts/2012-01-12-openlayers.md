---
layout: post
date: 2012-01-12 10:00:00 UTC
title: The Wary Guide to OpenLayers
hn:
categories:
- blog
- technical
---

[OpenLayers](http://openlayers.org/) is a very popular Javascript API for
web mapping. It's [deployed on the White House](http://www.whitehouse.gov/change/),
used as the basis for [a bunch](http://geoext.org/) of [other](https://github.com/opengeo/gxp) projects.
In a past life, I maintained [one of those projects, the Drupal module](http://drupal.org/project/openlayers) and
got a lot of experience using OpenLayers. MapBox launched Hosting
with OpenLayers and kept it that way for quite a while [before switching to Modest Maps](http://developmentseed.org/blog/2011/jun/29/fast-maps-tilestream-launches-compositing-modest-maps-and-new-mobile-support/). So I've had quite
a bit of experience using, debugging, and occasionally patching
OpenLayers.

Though I recommend you take a long, hard look at [Leaflet](http://leaflet.cloudmade.com/),
[Modest Maps](https://github.com/stamen/modestmaps-js), or [polymaps](http://polymaps.org/)
for new projects, there are lots of people who are going to use OpenLayers anyway,
for whatever reason (please add reasons to the comments). So here are some collected
words of wisdom about common pitfalls with the library. Hopefully this
saves new users some time and head-scratching.

<div class='shutter-300'>
  <a href='http://www.flickr.com/photos/tmcw/6746635/'><img src='http://farm1.staticflickr.com/5/6746635_a40adac65f_z.jpg?zz=1'/></a>
</div>

For new users, OpenLayers is a scary, scary place to be. You'll find many
things breaking in unexpected ways for weird reasons. This post is a quick summary
of vital understandings to have.

## LonLat is not Longitude Latitude [(i)](https://github.com/openlayers/openlayers/issues/83)

You would think that LonLat is asking for longitude and latitude
values: it reads Lon(gitude)Lat(itude), right?

Nope, `OpenLayers.LonLat` is a dumb container for any sort of coordinates,
whether they're in degrees, meters, feet, or cubits. It doesn't take on
any responsibility for projecting those coordinates into anything usable
by your map. If you do want something usable, you'll need to do something like

{% highlight js %}
var pt = new OpenLayers.LonLat(-20, 20);
pt.transform(
    // degrees are degrees
    new OpenLayers.Projection('EPSG:4326'),
    // but your map is in meters (probably)
    new OpenLayers.Projection('EPSG:900913'));
{% endhighlight %}

There's another gotcha here, did you notice it? Yep, `.transform` does changes
in-place. It doesn't return a reprojected `pt`, it reprojects `pt`. If you
aren't aware of this, you'll probably get burned - especially since the API
_returns the changed point_ as well.

## projection and displayProjection [(i)](https://github.com/openlayers/openlayers/issues/118)

Much like `OpenLayers.LonLat`, `OpenLayers.Map.displayProjection` seems to
introduce itself: that's the projection in which the map will display.

Nope: `displayProjection` is used in a handful of places. If you add a
`OpenLayers.Control.MousePosition` to the map, or a permalink, it'll get used
there: the permalink will link to something using that projection, and your
mouse's position will show degrees or meters or whatnot. But if you don't
have those controls, it doensn't matter one bit. The setting could be
called 'textDisplayOfPositions' or such, and it'd be more accurate.

## Your Raster Projections Aren't Going to Work [(i)](https://github.com/openlayers/openlayers/issues/112)

Do you have one map that's in `EPSG:4326` and one that's in `EPSG:900913`?
Or one that's in some [lambert conic local thing](http://en.wikipedia.org/wiki/Lambert_conformal_conic_projection)
and you want to put it on top of a [MapBox](http://tiles.mapbox.com/) map?

I hate to break it to you, but this isn't going to work.
You see, projections are baked into images: the images are skewed and
sized, and their tile sizes changed, in order to fit your very specific
mapping of earth-places to screen-places. And at this point,
there is no javascript API that can reproject images from one to the other.

If in this situation, there are a few options:

* Get your tile server to work in the proper projection for the map
* If you don't have control over the server, it's going to be hard. There
  are bleeding-edge solutions like [MapProxy](http://mapproxy.org/) that
  can reproject upstream sources, but the task is difficult.
* Use vector data, if your data and visualization needs are extremely light

Re: the first one. If you've got some map in a bizarre projection just because
that's the standard for the unit of company or government you work for, figure
out whether you can change that standard. It's unlikely that Google Maps and
co will be supporting boutique projections soon, and having incompatible maps
means that many fewer people will be using your data, and you'll have more
limited software options.

Not to say that you should switch entirely to spherical mercator: it's not the
ideal projection for static thematic maps or for local maps of certain places.
But _not providing_ tiles in it is unwise: the point of the internet is to
combine things, and your odd-projection maps will be orphans otherwise.

## When in doubt, put settings on Layers

OpenLayers lets you put lots of settings everywhere. The weirdest place
is the Map versus the Layer. This is a simple one: the Map is a fallback
for Layers. Put your geographic stuff on Layers. That means extents,
projections, resolutions, what-have-you. Don't repeat yourself and put
these settings in two places - that'll only make things more complicated.

If you've got lots and lots of layers in handwritten Javascript and you
need to move settings to the map, you'll have other problems anyway.

## maxExtent does not mean what you think it means

No: maxExtent doesn't keep people from moving the map. You're looking for
`restrictedExtent`.

maxExtent configures how much of the world is rendered on the map. Actually,
it does something more complicated than that, because it's not thinking
about the typical 'XYZ layer with only a country rendered' it's more like
'renderer thinks that this country is the world and rendered that'. I've
never been able to get maxExtent to work doing anything but setting it
to the maximum Mercator extent.

## Your imgPath (and themePath) is broken

Ah, imgPath. The best way to use OpenLayers controls is to not use them,
but unfortunately a lot of users are deathly scared of writing their own code,
even if that just means hooking up zoom in & out buttons.

But, if you must: imgPath. If you don't provide it, OpenLayers tries to figure
it out. So provide it, because the system will guess wrong. One day you'll
be chillin with a great map and your code is like:

{% highlight sh %}
/js/OpenLayers.js
looks for
/js/theme/*
{% endhighlight %}

Then someone runs [YSlow](http://developer.yahoo.com/yslow/) or something and
gets the bright idea of combining your javascript resources. So, the urls
become

{% highlight sh %}
/OpenLayers.js
looks for
/theme/*
{% endhighlight %}

And all of your images break. Moral of the story: specify your
imgPath and themePath.
And download the images for OpenLayers if you plan on using them.

## Don't hotlink your OpenLayers

Too many sites pull from [openlayers.org](http://openlayers.org/)
for OpenLayers.js. _Don't do this, unless you're just putting a page up
for testing_.

The OpenLayers.org version of OpenLayers.js is a _full build_ - which means that
it's big. It's 957K un-gzipped and 220K gzipped. For reference, 220K gzipped
is around 7 [jQueries](http://jquery.com/).

OpenLayers.org is not always online, and when it goes offline, your maps
will break. All of them. And depending on how you include the script tag,
your site will take a lot longer to load, because it's trying desperately
to get the code.

Plus, if you use the library on the front page,
`http://openlayers.org/api/OpenLayers.js`,
you'll get the latest API version of OpenLayers. Meaning you build your
site against 2.11, and when 2.12 is released, your site breaks.

Hopefully this is enough to convince you: download OpenLayers for yourself,
and put it on your own server.

## OpenLayers Controls Are Ugly

It's not too hard to make OpenLayer's default controls look nicer:
they simply haven't been updated for years. [Development Seed's OpenLayers Theme](https://github.com/developmentseed/openlayers_themes)
is one example - try it, and use the source SVG images to make
your own theme.

Note that the OpenLayers theme system falls apart at certain points:
popups are one part of the library that are near-impossible to style
nicely.

## Go and Conquer

If you're really looking to level up with OpenLayers, do a custom build:
look in the `build/` directory, and you'll find a `build.py` script
you can use to make slimmer builds of the library that only include parts
that you use. A dated example of how to do this is
[openlayers slim](https://github.com/developmentseed/openlayers_slim),
which we used at [Development Seed](http://developmentseed.org/) before
switching off of OpenLayers to [Modest Maps](http://github.com/stamen/modestmaps-js).

If you're using OpenLayers with [MapBox Hosting](http://tiles.mapbox.com/)
maps (as I'd recommend you do), try the [connector provided by the Wax library](http://mapbox.com/wax/connector-ol.html).
With the magic of [TileJSON](https://github.com/mapbox/tilejson), it
removes a lot of the potential configuration fail in using OpenLayers.

## See Also

* [Chris Schmidt's Response to my Historical Rant on OpenLayers](http://crschmidt.net/blog/archives/476/more-on-flaws-in-openlayers/)
