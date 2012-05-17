---
layout: post
date: 2012-05-15 10:00:00 UTC
title: How Web Maps Work
hn:
thumbnail: http://farm6.staticflickr.com/5331/7178643512_e465ecc7ef_q.jpg
categories:
- blog
---

<div class='shutter-300'>
<a href='http://farm6.staticflickr.com/5331/7178643512_e465ecc7ef_z.jpg'>
<img src='http://farm6.staticflickr.com/5331/7178643512_e465ecc7ef_z.jpg'>
</a>
</div>

This post aims to summarize the basic elements of web maps at
a deep level but without any implementation-specific details:
it should roughly describe the paradigm adopted by
[Leaflet](http://leaflet.cloudmade.com/),
[Modest Maps](http://modestmaps.com/), and [OpenLayers](http://openlayers.org/),
and the [slippy map tilename](http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames) standard.

This _doesn't_ describe non-tiled maps, like non-tiled
[WMS](http://en.wikipedia.org/wiki/Web_Map_Service) layers suported
by `OpenLayers.Layer.WMS` with [singleTile: true](http://dev.openlayers.org/releases/OpenLayers-2.11/doc/apidocs/files/OpenLayers/Layer/WMS-js.html#OpenLayers.Layer.WMS).

It _does_ generally describe tiled vector maps, with the obvious
caveat that, instead of simply displaying raster data, the browser
rasterizes a vector source before adding it to the map.

## Goal: Tile Layout

The end result of a map client is a tile layout: given a `viewport`
of, say, 640x480px, the client finds all tiles within a certain
zoom level and centerpoint which _intersect_ with this viewport.
It then arranges them so that tiles are perfectly adjacent.

# Data Types

## Tiles

Tiles are chunks of raster or vector data. Most commonly, tiles are
images of 256x256px, because they're broadly supported, and fast to consume,
but they can also be 512x512px.

Tiles can also be [JSON](http://www.json.org/), [GeoJSON](http://www.geojson.org/),
[Protocol buffers](http://code.google.com/p/protobuf/), or another kind of
vectorized data, so that rasterization can be pushed to the client. This has
its advantages and disadvantages, but that's another discussion: to the map
client, vector tiles are equivalent to raster tiles except with an
additional rendering step in-browser.

## Coordinates

Tile coordinates are [tuples](http://en.wikipedia.org/wiki/Tuple) with three elements:

    tile: [zoom, column, row]

Unlike locations and pixel coordinates, tile coordinates
uniquely identify maps because they include a zoom level.
They also differ in that coordinates can be interpreted as
_having area_, so
the coordinate `[2, 0, 0]` occupies the square of space
between it and `[2, 1, 1]`.

Since tiles are quad-tree indexed, they're transformed between
coordinates like such:

    tile: [zoom level, column, row]
    =     [zoom level + 1, column * 2, row * 2]
    =     [zoom level + n, column * 2^(zoom level - n), column * 2^(zoom level - n)]

So the location of the tile `[2, 1, 1]` (zoom 2, column & row 1) becomes `[3, 2, 2]`
at zoom level 3,, and so on.

Ref: [Modest Maps Coordinate.js](https://github.com/modestmaps/modestmaps-js/blob/master/src/coordinate.js)

## Locations

Locations are geographical locations: they can be represented as
`[latitude, longitude]` pairs. A location maps to a different,
unique coordinate at each zoom level.

The latitude longitude values are assumed to be [WGS84](http://en.wikipedia.org/wiki/World_Geodetic_System)
unless otherwise specified.

Ref: [Leaflet LatLng](https://github.com/CloudMade/Leaflet/blob/master/src/geo/LatLng.js)
| [Modest Maps Location](https://github.com/modestmaps/modestmaps-js/blob/master/src/location.js)
| [OpenLayers LonLat](https://github.com/openlayers/openlayers/blob/master/lib/OpenLayers/BaseTypes/LonLat.js)

## Pixel locations

Pixel locations are the most ephemeral and immediate units in web maps:
the pixel location of a point is a `[x, y]` pair of its offset
from the top-left of the map element. Every time that the map moves,
all pixel locations become invalid, so positioning elements on the map
with pixels requires you to reposition those elements every call to `draw()`.

Ref: [Modest Maps Point](https://github.com/modestmaps/modestmaps-js/blob/master/src/point.js) |
[OpenLayers Point](https://github.com/openlayers/openlayers/blob/master/lib/OpenLayers/BaseTypes/Pixel.js)

## Relationships Between Data Types

You can 'convert' between these different representations, but since
each type represents a different concept, it's not 1:1.

* *Coordinate &rarr; Location*: Each coordinate maps to one geographical location
* *Location &rarr; Coordinate*: Since coordinates have zoom as well as location,
  locations map to a different coordinate at each zoom level
* *Coordinate / Location &rarr; Point*: Coordinates and locations at a particular
  zoom levels map to points, but this changes whenever the map centerpoint
  moves.
* *Coordinate &rarr; Tile*: Coordinates _yield_ tiles: the coordinate `[0, 0, 0]` could
  yield a tile with the URL `http://c.tile.openstreetmap.org/0/0/0.png`. Tiles
  _represent_ coordinates.

# Functionality

## Map State

Given the goal of tile layout and the definition of a tile, let's start thinking
about the map client. Like any application, it is defined by its state.

The `state` of the map is its current zoom level and centerpoint:
this changes every time that the map moves, zooms, pans, etc. Other
attributes, like layer selections, styling, and such, will be described
as configuration.

There are multiple ways to represent state:

* A 'geographical location' and a zoom level
* A coordinate

The Modest Maps tradition uses a coordinate, so we'll describe those first,
but Leaflet and OpenLayers use geographical locations, which are equivalent.

## Changing Map State

Changing the map's state - in this case, represented by a Coordinate, is an appropriate
place for getters and setters. A minimal API for changing map state could be

{% highlight js %}
map.setCoordinate(coordinate);
{% endhighlight %}

And, indeed, this is what Modest Maps does inside of its higher abstractions. But a typical
set of abstractions would be:

{% highlight js %}
map.setCenter(location);
map.setZoom(zoomlevel);
{% endhighlight %}

Internally each of these functions will convert the `location` into a `coordinate`,
assign that as the current map state, and call `draw()`, a function that renders the map
onto the page - which is what we'll address in the next section.

## Rendering

Maps are rendered: typically as `<img>` elements in `<div>` elements.

The structure of an images-in-the-dom library is like so:

{% highlight html %}
<div id='map'>
  <div id='layer'>
    <div id='zoom-0'>
      <img src='tile/z/x/y.png'>
      <img src='tile/z/x/y.png'>
      ...
    </div>
  </div>
</div>
{% endhighlight %}

The structure here is extremely similar for libraries that use SVG
instead of HTML elements like [polymaps](http://polymaps.org/).

Some libraries, like [pixymaps](https://github.com/mbostock/pixymaps),
render to Canvas elements, but the render step is very similar:

{% highlight js %}
// (pseudocode)

// HTML
function positionTile(tile) {
    moveElementToPoint(tile.element, map.coordinatePoint(tiles.coordinate));
}

// Canvas
function positionTile(tile) {
    drawElementAtPoint(tile.element, map.coordinatePoint(tiles.coordinate));
}
{% endhighlight %}

So the main task of `positionTile` in the common case - in which it's
dealing with HTML elements - is positioning.

The simplest way to do this is with [absolute positioning inside of relative positioning](http://css-tricks.com/absolute-positioning-inside-relative-positioning/) -
the map's parent is relative, the children are absolutely positioned.

An optimization here is to use [CSS transforms](http://www.w3.org/TR/css3-2d-transforms/),
which has a few advantages: they can cause [fewer reflows](http://paulirish.com/2011/dom-html5-css3-performance/),
use hardware acceleration in their 3D versions, and, unlike
CSS's `width` and `height` properties, the [scaling transformation](http://www.w3.org/TR/SVG/coords.html#ScalingDefined)
is inherited.

## Map Interaction

Interaction is typically in the domain of 'handlers' which split up
different ways of moving and changing the map. A typical set of interactions
might be

* Double-click &rarr; zoom in around a point
* Drag &rarr; pan
* MouseWheel &rarr; zoom
* Single-finger swipe &rarr; pan
* Double-finger pinch &rarr; zoom

These handlers connect to the source of movement - like [mouse events](http://www.quirksmode.org/js/events_mouse.html)
in Javascript or a [GestureDetector](http://developer.android.com/reference/android/view/GestureDetector.html)
in Android's Java environment. Internally, they can use the map's API,
so they can be exchanged for other handlers without rearchitecting the map.

Ref: [Leaflet Map.Drag.js](https://github.com/CloudMade/Leaflet/blob/master/src/map/handler/Map.Drag.js) |
[Modest Maps mouse.js](https://github.com/modestmaps/modestmaps-js/blob/master/src/mouse.js) |
[OpenLayers Drag.js](https://github.com/openlayers/openlayers/blob/master/lib/OpenLayers/Handler/Drag.js)

## Tile Management and Removal

At each zoom level, the number of potential tiles increases exponentially -
at zoom level 5, 1,024 tiles are possible. The interface therefore needs
to intelligently load tiles that are visible and prune those that aren't.

To find what tiles are on screen, you find the Coordinates of the top-left
and bottom-right corners of the screen, and loop through them:

{% highlight js %}
// (pseudocode)

// The top left corner is the point 0, 0
var tl = map.pointCoordinate(new Point(0, 0));
// The bottom right corner is the size of the map
var br = map.pointCoordinate(new Point(map.width, map.height));
// Looking to build a list of valid tiles
var tiles = [];
// Loop through the map's space
for (var col = tl.column; col < br.column; col++) {
    for (var row = tl.row; row < br.row; row++) {
       tiles.push([map.zoom, col, row]);
    }
}
// Request these tiles
{% endhighlight %}

The simplest way to implement tile _removal_ is with
an [LRU cache](http://en.wikipedia.org/wiki/Cache_algorithms) -
tiles that haven't been displayed recently are the first ones to be flushed
from the cache. On the web, this isn't necessarily part of the map
client itself, since web browser implement their own caching.

## Further reading

* maptiler.org: [Tiles à la Google Maps: Coordinates, Tile Bounds and Projection](http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/)
* macwright.org: [Understanding Map Projections](http://macwright.org/2012/01/27/projections-understanding.html)
* modest maps: [How Modest Maps Works](https://github.com/modestmaps/modestmaps-js/wiki/How-it-Works)
