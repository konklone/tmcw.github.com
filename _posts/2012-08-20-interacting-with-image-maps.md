---
layout: post
title: Interacting with Image Maps
categories:
- blog
---

Last week I wrote [Images as Maps](http://macwright.org/2012/08/13/images-as-maps.html),
which talked about one technique of tricking spatial software like
[TileMill](http://mapbox.com/tilemill/) into displaying plain old images
as maps. The effect is making commonplace images accessible with stuff like
[MapBox](http://mapbox.com/). Versus a 'commercial solution' like
[Zoomify](http://www.zoomify.com/), it's a bit of a stretch but has potential
benefits - cross-browser, open-source Javascript libraries, strong
infrastructure. Plus, misusing systems is fun.

<iframe width='640' height='300' frameBorder='0'
    src='http://a.tiles.mapbox.com/v3/tmcw.map-5qadc7q9.html#4/10.055/-147.700'></iframe>

The first step is input, or data: and this is handled by the `togeo.py` script.
It tells TileMill that your source image is in Spherical Mercator, and thus
doesn't need to be skewed or stretched at all.

## But what about navigating within these maps?

So, the vast majority of map navigation is via latitude and longitude values.
To create and center a map, you usually do something like

{% highlight js %}
var map = mapbox.map('map');
map.center({ lat: 37, lon: -77 });
{% endhighlight %}

If the map was in the ugly [plate carrée projection](http://en.wikipedia.org/wiki/Equirectangular_projection),
then just using pixel values scaled into latitude-longitude would work, but
nearly all web maps are made in good old spherical mercator, which does
not have a 1:1 relationship between lines of latitude and pixels.

The first issue is what to do about bounds. The bounds of Spherical Mercator
are the corners `-20037508.34, -20037508.34, 20037508.34, 20037508.34` -
which are technically expressed in 'meters' but don't take that literally.
My script chooses to fit the image as best it can within the bounds, and center
it in the other direction, if the aspect ratio is not 1:1.

<img src='/graphics/interacting-with-image-maps.png' width='640' height='180' />

<span class='image-credit'>the three basic placements of togeo</span>

And so now given one measurement - _the original pixel size of the image_,
we can derive the new geographical location of any pixel location in that image -
what I'll call an 'image pixel'. The word 'Pixel' is a bit overloaded, since
there are screen pixels, the `MM.Point` class for any x,y value, etc.
Image pixels will refer to absolute pixel locations on an image, like you'd
see in Photoshop's info window.
We do this with coordinates and just a little bit of magic.

## Coordinates

I mentioned [coordinates](http://macwright.org/2012/05/15/how-web-maps-work.html) in
how web maps work: they're a data type that tells you the column, row, and
zoom level of places in a map, like you might have seen in `/0/0/0.png` URLs.
The great thing about coordinates is that they're simple - they're in
simple x/y space, where the '0' tile - the tile that represents the whole
world in one 256x256 image - has potential x & y values from 0 to 1 -
so the center of that tile is the coordinate `{ row: 0.5, column: 0.5, zoom: 0 }`.

<img src='/graphics/interacting-with-image-maps-2.png' width='640' height='180' />

So, let's start coding. First this code needs to know about the size of the image.
We could create an object to do this, but it's simpler to use a
[javascript closure](http://www.javascriptkit.com/javatutors/closures.shtml) -
in this case a function that returns another function having scoped a few values.

{% highlight js %}
// this is the closure - a function that you call to get a function,
// which keeps a memory of the original values you passed.
function pixelToCoordinate(w, h) {
  return function(x, y) {
    // when this function is called, it still knows the values
    // of w, h, and map
  };
}
{% endhighlight %}

I'll split up the implementation into two functions. The first converts
an image pixel into a map coordinate:

{% highlight js %}
function pixelToCoordinate(w, h) {
  return function(x, y) {
    // here's the only real tricky part
    // of the code: if the image doesn't fill
    // the whole canvas, that means that it's
    // nudged either down or to the left
    // to be centered. The size of this nudge
    // is equal to the difference between
    // the width and height over two.

    if (w > h) y += (w - h) / 2;
    if (w < h) x += (h - w) / 2;

    return new MM.Coordinate(
      // row
      y / Math.max(w, h),
      // column
      x / Math.max(w, h),
      // zoom
      0
    );
  };
}
{% endhighlight %}

The second function converts an image pixel into a geographical location with
lat/lon values.

{% highlight js %}
function pixelToLocation(w, h, map) {
  var toCoordinate = pixelToCoordinate(w, h);
  return function(x, y) {
    // map.coordinateLocation takes a coordinate
    // value and returns a geographical
    // location value.
    return map.coordinateLocation(toCoordinate(x, y));
  };
}
{% endhighlight %}

Why split this into two sections? The `map.coordinateLocation` call is somewhat
expensive - it creates four objects per call. This _shouldn't matter_
for 95% of uses, but if you're doing tons of calls per second, you'll
start to run into [garbage collection](http://www.scirra.com/blog/76/how-to-write-low-garbage-real-time-javascript)
hassles.

Anyway, on to a demo:

<iframe src='http://bl.ocks.org/d/3388822/' width='640' height='300'></iframe>

[See this inline with source on bl.ocks.org](http://bl.ocks.org/3388822)

## See Also

* [Leaflet ticket #210 is working on no-projection support](https://github.com/CloudMade/Leaflet/issues/210)
